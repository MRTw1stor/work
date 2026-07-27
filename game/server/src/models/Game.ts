import {
  GamePhase,
  GameRole,
  Player,
  GameEvent,
  EventData,
} from "src/types/types";
import { roles } from "../config/roles";

export class Game {
  public players: Map<string, Player>;
  public gamePhase: GamePhase;
  public minPlayers: number;
  public maxPlayers: number;
  public roles: GameRole[];
  public events: Map<string, GameEvent>;
  public messages: Map<string, EventData[]>;
  private nextPlayerId: number;

  constructor() {
    this.players = new Map();
    this.gamePhase = "lobby";
    this.minPlayers = 4;
    this.maxPlayers = 10;
    this.roles = [];
    this.events = new Map();
    this.messages = new Map();
    this.nextPlayerId = 0;
  }

  private initializeRoles(countPlayers: number): void {
    if (!roles || this.roles.length > 0) {
      return;
    }

    for (let i = 0; i < countPlayers; i++) {
      const role = roles[i];

      if (role) {
        this.roles.push({
          ...role,
          isSelected: false,
          roleButtons: role.roleButtons.map((button) => ({ ...button })),
        });
      }
    }
  }

  public createPlayer(playerSocket: string): void {
    const playerId = this.nextPlayerId;
    this.nextPlayerId += 1;

    this.players.set(playerSocket, {
      playerId: playerId,
      isReady: false,
    });
  }

  public setPlayerIsReady(playerSocket: string): void {
    const player = this.players.get(playerSocket);

    if (!player) {
      return;
    }

    player.isReady = true;
  }

  public setPlayerRole(playerSocket: string, roleId: number): boolean {
    const player = this.players.get(playerSocket);

    if (!player || player.playerRole) {
      return false;
    }

    for (const role of this.roles) {
      if (role.roleId === roleId && !role.isSelected) {
        role.isSelected = true;
        player.playerRole = role;
        return true;
      }
    }

    return false;
  }

  public allPlayersIsReady(): boolean {
    const countPlayers = this.players.size;

    if (countPlayers < this.minPlayers) {
      return false;
    }

    let countReadyPlayers = 0;

    this.players.forEach((player) => {
      if (player.isReady) {
        countReadyPlayers += 1;
      }
    });

    if (countReadyPlayers === countPlayers) {
      this.initializeRoles(countPlayers);
      this.gamePhase = "cards";
      return true;
    }

    return false;
  }

  public allCardsIsSelected(): boolean {
    const rolesCount = this.roles.length;
    let selectedRolesCount = 0;

    for (const role of this.roles) {
      if (role.isSelected === true) {
        selectedRolesCount++;
      }
    }

    if (rolesCount === selectedRolesCount) {
      this.gamePhase = "game";
      return true;
    }

    return false;
  }

  public getAllPlayers(): Array<Player & { playerSocket: string }> {
    return Array.from(this.players, ([playerSocket, playerData]) => ({
      playerSocket,
      ...playerData,
    }));
  }

  public getPlayerData(
    socketId: string
  ): ({ socketId: string } & Player) | null {
    const player = this.players.get(socketId);

    if (player) {
      return { socketId, ...player };
    }

    return null;
  }

  public getAllRoles(): GameRole[] {
    return this.roles;
  }

  public resetPlayersIsReady(): void {
    this.players.forEach((playerData) => {
      playerData.isReady = false;
    });
  }

  public resetCardsIsSelected(): void {
    this.roles.forEach((role) => {
      role.isSelected = false;
    });
    this.roles = [];
    this.players.forEach((playerData) => {
      playerData.playerRole = undefined;
    });
  }

  public deletePlayer(playerSocket: string): void {
    this.messages.delete(playerSocket);
    this.players.delete(playerSocket);
  }

  public changePlayerSocket(playerSocket: string, playerId: number): boolean {
    const entry = Array.from(this.players.entries()).find(
      ([socket, player]) => player.playerId === playerId
    );

    if (!entry) {
      return false;
    }

    const [oldSocket, player] = entry;

    if (oldSocket === playerSocket) {
      return true;
    }

    const playerMessages = this.messages.get(oldSocket);

    this.players.delete(oldSocket);
    this.players.set(playerSocket, player);

    if (playerMessages) {
      this.messages.delete(oldSocket);
      this.messages.set(playerSocket, playerMessages);
    }

    return true;
  }
}
