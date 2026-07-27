"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandlers = void 0;
var logger_1 = __importDefault(require("../utils/logger"));
var SocketHandlers = /** @class */ (function () {
    function SocketHandlers(io, game) {
        this.io = io;
        this.game = game;
    }
    SocketHandlers.prototype.initAllHandlers = function (socket) {
        this.onPlayerConnect(socket);
        this.onPlayerDisconnect(socket);
        this.onGetLobby(socket);
        this.onPlayerIsReady(socket);
        this.onGetRoles(socket);
        this.onSelectRole(socket);
        this.onGetPlayerData(socket);
        this.onCreateMessage(socket);
    };
    SocketHandlers.prototype.emitLobbyUpdate = function () {
        this.io.emit("lobbyUpdate", this.game.getAllPlayers());
    };
    SocketHandlers.prototype.emitRolesUpdate = function () {
        this.io.emit("rolesUpdate", this.game.getAllRoles());
    };
    SocketHandlers.prototype.emitSendRoles = function (socket) {
        logger_1.default.info("\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E ".concat(socket.id, " \u0441\u043F\u0438\u0441\u043E\u043A \u0440\u043E\u043B\u0435\u0439"));
        socket.emit("sendRoles", this.game.getAllRoles());
    };
    SocketHandlers.prototype.onGetRoles = function (socket) {
        var _this = this;
        socket.on("getRoles", function () { return _this.emitSendRoles(socket); });
    };
    SocketHandlers.prototype.onGetLobby = function (socket) {
        var _this = this;
        socket.on("getLobby", function () { return _this.emitLobbyUpdate(); });
    };
    SocketHandlers.prototype.onCreateMessage = function (socket) {
        var _this = this;
        socket.on("createMessage", function (data) {
            try {
                if (!data) {
                    return;
                }
                if (!data.eventRecepient) {
                    return;
                }
                var players = _this.game.players;
                players.forEach(function (player, socketId) {
                    var _a;
                    if (((_a = player.playerRole) === null || _a === void 0 ? void 0 : _a.roleId) === data.eventRecepient) {
                        var playerMessages = _this.game.messages.get(socketId);
                        if (playerMessages) {
                            playerMessages.push(data.eventData);
                        }
                        else {
                            _this.game.messages.set(socketId, [data.eventData]);
                        }
                        logger_1.default.info("\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E \u0441 \u0440\u043E\u043B\u044C\u044E: ".concat(data.eventRecepient), { playerMessages: playerMessages });
                        _this.io
                            .to(socketId)
                            .emit("sendMessage", _this.game.messages.get(socketId));
                        return;
                    }
                });
            }
            catch (error) {
                logger_1.default.error("Ошибка создания сообщения", error, {
                    socketId: socket.id,
                });
            }
        });
    };
    SocketHandlers.prototype.onSelectRole = function (socket) {
        var _this = this;
        socket.on("selectRole", function (roleId) {
            try {
                if (!_this.game.setPlayerRole(socket.id, roleId)) {
                    return;
                }
                logger_1.default.info("\u0418\u0433\u0440\u043E\u043A ".concat(socket.id, " \u0432\u044B\u0431\u0440\u0430\u043B \u0440\u043E\u043B\u044C \"").concat(roleId, "\""));
                _this.emitRolesUpdate();
                if (_this.game.allCardsIsSelected()) {
                    logger_1.default.info("Все карты выбраны. Переход к игре", _this.game.players);
                    _this.io.emit("changeGamePhase", _this.game.gamePhase);
                }
            }
            catch (error) {
                logger_1.default.error("Ошибка выбора роли", error, { socketId: socket.id });
            }
        });
    };
    SocketHandlers.prototype.onGetPlayerData = function (socket) {
        var _this = this;
        socket.on("getPlayerData", function (playerId) {
            if (playerId === void 0) { playerId = null; }
            try {
                if (playerId !== null) {
                    logger_1.default.info("Игрок уже существует. Переподключаем...", {
                        playerId: playerId,
                        newSocketId: socket.id,
                    });
                    _this.game.changePlayerSocket(socket.id, playerId);
                }
                var playerData = _this.game.getPlayerData(socket.id);
                if (playerData === null) {
                    return;
                }
                logger_1.default.info("\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E ".concat(socket.id), {
                    playerData: playerData,
                });
                socket.emit("sendPlayerData", playerData);
            }
            catch (error) {
                logger_1.default.error("Ошибка отправки данных пользователю", error, {
                    socketId: socket.id,
                });
            }
        });
    };
    SocketHandlers.prototype.onPlayerConnect = function (socket) {
        var _this = this;
        socket.on("playerConnect", function (playerId) {
            try {
                var existingPlayer = _this.game.players.get(socket.id);
                if (existingPlayer) {
                    socket.emit("changeGamePhase", _this.game.gamePhase);
                    return;
                }
                if (playerId !== null && _this.game.changePlayerSocket(socket.id, playerId)) {
                    logger_1.default.info("Игрок переподключился", {
                        playerId: playerId,
                        socketId: socket.id,
                    });
                    socket.emit("changeGamePhase", _this.game.gamePhase);
                    _this.emitLobbyUpdate();
                    return;
                }
                if (_this.game.gamePhase === "game") {
                    socket.emit("errorMessage", "Ошибка подключения. Игра уже началась");
                    logger_1.default.info("Подключился новый игрок, но игра уже началась", {
                        socket: socket.id,
                    });
                    return;
                }
                if (_this.game.players.size < _this.game.maxPlayers) {
                    _this.game.createPlayer(socket.id);
                    logger_1.default.info("Игрок подключился", { socketId: socket.id });
                    socket.emit("changeGamePhase", _this.game.gamePhase);
                    _this.emitLobbyUpdate();
                }
                else {
                    logger_1.default.info("Невозможно подключиться");
                    socket.emit("errorMessage", "Ошибка подключения. Игроков уже макимальное количество");
                }
            }
            catch (error) {
                logger_1.default.error("Ошибка подключения игрока", error, {
                    socketId: socket.id,
                });
            }
        });
    };
    SocketHandlers.prototype.onPlayerIsReady = function (socket) {
        var _this = this;
        socket.on("playerIsReady", function () {
            try {
                var player = _this.game.players.get(socket.id);
                if (!player) {
                    return;
                }
                if (player.isReady) {
                    return;
                }
                player.isReady = true;
                logger_1.default.info("\u0418\u0433\u0440\u043E\u043A ".concat(player.playerId, " \u0433\u043E\u0442\u043E\u0432"));
                _this.emitLobbyUpdate();
                if (_this.game.allPlayersIsReady()) {
                    logger_1.default.info("Все игроки подключились. Переход в выбор карт", _this.game.players);
                    _this.io.emit("changeGamePhase", _this.game.gamePhase);
                }
            }
            catch (error) {
                logger_1.default.error("Ошибка готовности игрока", error, {
                    socketId: socket.id,
                });
            }
        });
    };
    SocketHandlers.prototype.onPlayerDisconnect = function (socket) {
        var _this = this;
        socket.on("disconnect", function (reason) {
            try {
                var player = _this.game.players.get(socket.id);
                if (!player) {
                    logger_1.default.warn("Игрока не существует!");
                    return;
                }
                if (_this.game.gamePhase === "game") {
                    return;
                }
                _this.game.resetPlayersIsReady();
                _this.game.resetCardsIsSelected();
                _this.game.gamePhase = "lobby";
                _this.io.emit("changeGamePhase", _this.game.gamePhase);
                logger_1.default.info("Игрок отключился", { socketId: socket.id, reason: reason });
                _this.game.deletePlayer(socket.id);
                _this.emitLobbyUpdate();
            }
            catch (error) {
                logger_1.default.error("Ошибка отключения игрока", error, {
                    socketId: socket.id,
                });
            }
        });
    };
    return SocketHandlers;
}());
exports.SocketHandlers = SocketHandlers;
