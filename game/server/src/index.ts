import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { networkInterfaces } from "os";
import { Game } from "./models/Game";
import { SocketHandlers } from "./handlers/SocketHandlers";

const app = express();
const PORT = process.env.PORT || 3001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const game = new Game();
const socketHandlers = new SocketHandlers(io, game);

function getLocalIP(): void {
  const nets = networkInterfaces();

  for (const interfaceName of Object.keys(nets)) {
    const interfaceData = nets[interfaceName];
    if (!interfaceData) continue;

    for (const net of interfaceData) {
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

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/", (req, res) => {
  res.json({
    message: "Игровой сервер запущен",
  });
});

io.on("connection", (socket) => {
  socketHandlers.initAllHandlers(socket);
});

process.on("SIGINT", () => {
  console.log("\nВыключение сервера...");
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

httpServer.listen(PORT, () => {
  console.log("Игровой сервер запущен!");
  console.log(`Порт: ${PORT}`);
  console.log(`Режим: ${process.env.NODE_ENV || "development"}`);
  console.log("Время запуска:", new Date().toLocaleString());
  console.log("────────────────────────────────────");
});
