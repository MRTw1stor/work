export type GamePhase = "lobby" | "cards" | "game";

export type EmitType = "call" | "message" | "minigame" | "queue" | "dialog";

export interface Player {
  playerSocket?: string;
  playerId: number;
  isReady: boolean;
  playerRole?: GameRole;
}

export interface GameRole {
  roleId: number;
  roleName: string;
  roleDescription: string;
  roleCondition?: string;
  roleNumber: string;
  rolePassword: string;
  roleProfile: string;
  roleTask: string;
  roleImg: string;
  roleButtons: RoleButton[];
  isSelected: boolean;
}

export interface RoleButton {
  buttonEmit: string;
  buttonTitle: string;
  buttonDesc?: string;
  isActive: boolean;
  buttonData?: GameEvent;
  buttonImage?: string;
}

export interface GameEvent {
  eventData: EventData;
  eventRecepient: number;
}

export interface EventData {
  dataText: string;
  dataButtons: EventButton[];
}

export interface EventButton {
  buttonText: string;
  buttonEmit: string;
  buttonDesc?: string;
}
