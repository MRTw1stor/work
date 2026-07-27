import { Server, Socket } from "socket.io";
import { Game } from "src/models/Game";
import Logger from "../utils/logger";
import { GameEvent } from "src/types/types";

export class SocketHandlers {
  private readonly io: Server;
  private readonly game: Game;

  constructor(io: Server, game: Game) {
    this.io = io;
    this.game = game;
  }

  public initAllHandlers(socket: Socket): void {
    this.onPlayerConnect(socket);
    this.onPlayerDisconnect(socket);
    this.onGetLobby(socket);
    this.onPlayerIsReady(socket);
    this.onGetRoles(socket);
    this.onSelectRole(socket);
    this.onGetPlayerData(socket);
    this.onCreateMessage(socket);
  }

  private emitLobbyUpdate(): void {
    this.io.emit("lobbyUpdate", this.game.getAllPlayers());
  }

  private emitRolesUpdate(): void {
    this.io.emit("rolesUpdate", this.game.getAllRoles());
  }

  private emitSendRoles(socket: Socket): void {
    Logger.info(`Отправка пользователю ${socket.id} список ролей`);
    socket.emit("sendRoles", this.game.getAllRoles());
  }

  private onGetRoles(socket: Socket): void {
    socket.on("getRoles", () => this.emitSendRoles(socket));
  }

  private onGetLobby(socket: Socket): void {
    socket.on("getLobby", () => this.emitLobbyUpdate());
  }

  private onCreateMessage(socket: Socket): void {
    socket.on("createMessage", (data: GameEvent) => {
      try {
        if (!data) {
          return;
        }

        if (!data.eventRecepient) {
          return;
        }

        const players = this.game.players;

        players.forEach((player, socketId) => {
          if (player.playerRole?.roleId === data.eventRecepient) {
            const playerMessages = this.game.messages.get(socketId);

            if (playerMessages) {
              playerMessages.push(data.eventData);
            } else {
              this.game.messages.set(socketId, [data.eventData]);
            }

            Logger.info(
              `Отправка сообщения пользователю с ролью: ${data.eventRecepient}`,
              { playerMessages }
            );
            this.io
              .to(socketId)
              .emit("sendMessage", this.game.messages.get(socketId));

            return;
          }
        });
      } catch (error) {
        Logger.error("Ошибка создания сообщения", error, {
          socketId: socket.id,
        });
      }
    });
  }

  private onSelectRole(socket: Socket): void {
    socket.on("selectRole", (roleId: number) => {
      try {
        if (!this.game.setPlayerRole(socket.id, roleId)) {
          return;
        }

        Logger.info(`Игрок ${socket.id} выбрал роль "${roleId}"`);
        this.emitRolesUpdate();

        if (this.game.allCardsIsSelected()) {
          Logger.info("Все карты выбраны. Переход к игре", this.game.players);
          this.io.emit("changeGamePhase", this.game.gamePhase);
        }
      } catch (error) {
        Logger.error("Ошибка выбора роли", error, { socketId: socket.id });
      }
    });
  }

  private onGetPlayerData(socket: Socket): void {
    socket.on("getPlayerData", (playerId: number | null = null) => {
      try {
        if (playerId !== null) {
          Logger.info("Игрок уже существует. Переподключаем...", {
            playerId: playerId,
            newSocketId: socket.id,
          });

          this.game.changePlayerSocket(socket.id, playerId);
        }

        const playerData = this.game.getPlayerData(socket.id);
        if (playerData === null) {
          return;
        }

        Logger.info(`Отправка данных пользователю ${socket.id}`, {
          playerData: playerData,
        });

        socket.emit("sendPlayerData", playerData);
      } catch (error) {
        Logger.error("Ошибка отправки данных пользователю", error, {
          socketId: socket.id,
        });
      }
    });
  }

  private onPlayerConnect(socket: Socket): void {
    socket.on("playerConnect", (playerId: number | null) => {
      try {
        const existingPlayer = this.game.players.get(socket.id);
        if (existingPlayer) {
          socket.emit("changeGamePhase", this.game.gamePhase);
          return;
        }

        if (playerId !== null && this.game.changePlayerSocket(socket.id, playerId)) {
          Logger.info("Игрок переподключился", {
            playerId,
            socketId: socket.id,
          });

          socket.emit("changeGamePhase", this.game.gamePhase);
          this.emitLobbyUpdate();
          return;
        }

        if (this.game.gamePhase === "game") {
          socket.emit("errorMessage", "Ошибка подключения. Игра уже началась");

          Logger.info("Подключился новый игрок, но игра уже началась", {
            socket: socket.id,
          });

          return;
        }
        if (this.game.players.size < this.game.maxPlayers) {
          this.game.createPlayer(socket.id);

          Logger.info("Игрок подключился", { socketId: socket.id });

          socket.emit("changeGamePhase", this.game.gamePhase);
          this.emitLobbyUpdate();
        } else {
          Logger.info("Невозможно подключиться");

          socket.emit(
            "errorMessage",
            "Ошибка подключения. Игроков уже макимальное количество"
          );
        }
      } catch (error) {
        Logger.error("Ошибка подключения игрока", error, {
          socketId: socket.id,
        });
      }
    });
  }

  private onPlayerIsReady(socket: Socket): void {
    socket.on("playerIsReady", () => {
      try {
        const player = this.game.players.get(socket.id);
        if (!player) {
          return;
        }

        if (player.isReady) {
          return;
        }

        player.isReady = true;

        Logger.info(`Игрок ${player.playerId} готов`);

        this.emitLobbyUpdate();

        if (this.game.allPlayersIsReady()) {
          Logger.info(
            "Все игроки подключились. Переход в выбор карт",
            this.game.players
          );
          this.io.emit("changeGamePhase", this.game.gamePhase);
        }
      } catch (error) {
        Logger.error("Ошибка готовности игрока", error, {
          socketId: socket.id,
        });
      }
    });
  }

  private onPlayerDisconnect(socket: Socket): void {
    socket.on("disconnect", (reason: string) => {
      try {
        const player = this.game.players.get(socket.id);

        if (!player) {
          Logger.warn("Игрока не существует!");
          return;
        }

        if (this.game.gamePhase === "game") {
          return;
        }

        this.game.resetPlayersIsReady();
        this.game.resetCardsIsSelected();
        this.game.gamePhase = "lobby";
        this.io.emit("changeGamePhase", this.game.gamePhase);
        Logger.info("Игрок отключился", { socketId: socket.id, reason });
        this.game.deletePlayer(socket.id);
        this.emitLobbyUpdate();
      } catch (error) {
        Logger.error("Ошибка отключения игрока", error, {
          socketId: socket.id,
        });
      }
    });
  }
}
