"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var roles_1 = require("../config/roles");
var Game = /** @class */ (function () {
    function Game() {
        this.players = new Map();
        this.gamePhase = "lobby";
        this.minPlayers = 4;
        this.maxPlayers = 10;
        this.roles = [];
        this.events = new Map();
        this.messages = new Map();
        this.nextPlayerId = 0;
    }
    Game.prototype.initializeRoles = function (countPlayers) {
        if (!roles_1.roles || this.roles.length > 0) {
            return;
        }
        for (var i = 0; i < countPlayers; i++) {
            var role = roles_1.roles[i];
            if (role) {
                this.roles.push(__assign(__assign({}, role), { isSelected: false, roleButtons: role.roleButtons.map(function (button) { return (__assign({}, button)); }) }));
            }
        }
    };
    Game.prototype.createPlayer = function (playerSocket) {
        var playerId = this.nextPlayerId;
        this.nextPlayerId += 1;
        this.players.set(playerSocket, {
            playerId: playerId,
            isReady: false,
        });
    };
    Game.prototype.setPlayerIsReady = function (playerSocket) {
        var player = this.players.get(playerSocket);
        if (!player) {
            return;
        }
        player.isReady = true;
    };
    Game.prototype.setPlayerRole = function (playerSocket, roleId) {
        var player = this.players.get(playerSocket);
        if (!player || player.playerRole) {
            return false;
        }
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            if (role.roleId === roleId && !role.isSelected) {
                role.isSelected = true;
                player.playerRole = role;
                return true;
            }
        }
        return false;
    };
    Game.prototype.allPlayersIsReady = function () {
        var countPlayers = this.players.size;
        if (countPlayers < this.minPlayers) {
            return false;
        }
        var countReadyPlayers = 0;
        this.players.forEach(function (player) {
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
    };
    Game.prototype.allCardsIsSelected = function () {
        var rolesCount = this.roles.length;
        var selectedRolesCount = 0;
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            if (role.isSelected === true) {
                selectedRolesCount++;
            }
        }
        if (rolesCount === selectedRolesCount) {
            this.gamePhase = "game";
            return true;
        }
        return false;
    };
    Game.prototype.getAllPlayers = function () {
        return Array.from(this.players, function (_a) {
            var playerSocket = _a[0], playerData = _a[1];
            return (__assign({ playerSocket: playerSocket }, playerData));
        });
    };
    Game.prototype.getPlayerData = function (socketId) {
        var player = this.players.get(socketId);
        if (player) {
            return __assign({ socketId: socketId }, player);
        }
        return null;
    };
    Game.prototype.getAllRoles = function () {
        return this.roles;
    };
    Game.prototype.resetPlayersIsReady = function () {
        this.players.forEach(function (playerData) {
            playerData.isReady = false;
        });
    };
    Game.prototype.resetCardsIsSelected = function () {
        this.roles.forEach(function (role) {
            role.isSelected = false;
        });
        this.roles = [];
        this.players.forEach(function (playerData) {
            playerData.playerRole = undefined;
        });
    };
    Game.prototype.deletePlayer = function (playerSocket) {
        this.messages.delete(playerSocket);
        this.players.delete(playerSocket);
    };
    Game.prototype.changePlayerSocket = function (playerSocket, playerId) {
        var entry = Array.from(this.players.entries()).find(function (_a) {
            var socket = _a[0], player = _a[1];
            return player.playerId === playerId;
        });
        if (!entry) {
            return false;
        }
        var oldSocket = entry[0], player = entry[1];
        if (oldSocket === playerSocket) {
            return true;
        }
        var playerMessages = this.messages.get(oldSocket);
        this.players.delete(oldSocket);
        this.players.set(playerSocket, player);
        if (playerMessages) {
            this.messages.delete(oldSocket);
            this.messages.set(playerSocket, playerMessages);
        }
        return true;
    };
    return Game;
}());
exports.Game = Game;
