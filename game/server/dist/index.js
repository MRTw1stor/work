"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var os_1 = require("os");
var Game_1 = require("./models/Game");
var SocketHandlers_1 = require("./handlers/SocketHandlers");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var game = new Game_1.Game();
var socketHandlers = new SocketHandlers_1.SocketHandlers(io, game);
function getLocalIP() {
    var nets = (0, os_1.networkInterfaces)();
    for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
        var interfaceName = _a[_i];
        var interfaceData = nets[interfaceName];
        if (!interfaceData)
            continue;
        for (var _b = 0, interfaceData_1 = interfaceData; _b < interfaceData_1.length; _b++) {
            var net = interfaceData_1[_b];
            if (net.family === "IPv4" && !net.internal) {
                console.log("Адрес для подключения: ", net.address);
                return;
            }
        }
    }
    console.log("Не удалось найти локальный IP адрес");
    return;
}
getLocalIP();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
});
app.get("/", function (req, res) {
    res.json({
        message: "Игровой сервер запущен",
    });
});
io.on("connection", function (socket) {
    socketHandlers.initAllHandlers(socket);
});
process.on("SIGINT", function () {
    console.log("\nВыключение сервера...");
    setTimeout(function () {
        process.exit(0);
    }, 1000);
});
httpServer.listen(PORT, function () {
    console.log("Игровой сервер запущен!");
    console.log("\u041F\u043E\u0440\u0442: ".concat(PORT));
    console.log("\u0420\u0435\u0436\u0438\u043C: ".concat(process.env.NODE_ENV || "development"));
    console.log("Время запуска:", new Date().toLocaleString());
    console.log("────────────────────────────────────");
});
