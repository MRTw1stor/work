# Game

Мультиплеерная browser-игра на React и Socket.IO. Сервер хранит состояние партии в памяти, а клиент показывает этапы игры: старт, лобби, выбор карточек и экран персонажа.

## Стек

- Client: React, TypeScript, CSS Modules, react-router-dom, socket.io-client
- Server: Node.js, TypeScript, Socket.IO
- Package manager: npm workspaces

## Структура

```text
client/
  public/              # изображения, шрифты, index.html
  src/
    components/        # экраны и модальные окна игры
    App.tsx            # маршруты и общая socket-навигация
    socket.ts          # подключение к Socket.IO серверу
    types.ts           # клиентские типы

server/
  src/
    config/roles.ts    # роли, тексты и действия персонажей
    handlers/          # Socket.IO обработчики
    models/Game.ts     # состояние игры
    index.ts           # запуск HTTP/Socket.IO сервера
    types/             # серверные типы
```

## Установка

Из корня проекта:

```bash
npm install
```

Зависимости установятся для workspaces `client` и `server`.

## Настройка клиента

Клиент подключается к Socket.IO серверу через `REACT_APP_SOCKET_URL`.

Создайте `client/.env` по примеру:

```bash
REACT_APP_SOCKET_URL=http://localhost:3001
```

Если переменная не задана, клиент попробует подключиться к:

```text
http://<текущий-host>:3001
```

Для игры с нескольких устройств в локальной сети обычно нужно указать IP машины с сервером, например:

```bash
REACT_APP_SOCKET_URL=http://192.168.1.14:3001
```

## Запуск в разработке

В одном терминале запустите сервер:

```bash
cd server
npm run dev
```

Во втором терминале запустите клиент:

```bash
cd client
npm start
```

По умолчанию:

- сервер работает на `http://localhost:3001`
- клиент CRA обычно открывается на `http://localhost:3000`

## Сборка

Сервер:

```bash
cd server
npm run build
```

Клиент:

```bash
cd client
npm run build
```

## Основной игровой поток

1. Игрок открывает стартовый экран и подключается к серверу.
2. Сервер создаёт игрока и переводит клиента в лобби.
3. В лобби игроки нажимают кнопку готовности.
4. Когда готово минимум 4 игрока и все подключённые игроки готовы, сервер переводит игру к выбору карточек.
5. Игроки выбирают роли.
6. Когда все карточки выбраны, сервер переводит игру в фазу `game`.
7. На игровом экране игрок видит данные персонажа, действия, сообщения и телефон.

## Важные файлы

- `server/src/models/Game.ts` - правила состояния игры: игроки, роли, готовность, реконнект.
- `server/src/handlers/SocketHandlers.ts` - socket-события клиента и сервера.
- `server/src/config/roles.ts` - контент ролей и кнопок действий.
- `client/src/App.tsx` - маршруты и переходы между фазами.
- `client/src/components/Lobby/Lobby.tsx` - лобби и готовность игроков.
- `client/src/components/Cards/Cards.tsx` - выбор ролей.
- `client/src/components/Game/Game.tsx` - экран персонажа.

## Socket-события

Основные события клиента:

- `playerConnect` - подключение или восстановление игрока.
- `getLobby` - запрос состояния лобби.
- `playerIsReady` - игрок готов.
- `getRoles` - запрос доступных ролей.
- `selectRole` - выбор роли.
- `getPlayerData` - запрос данных текущего игрока.
- `createMessage` - создание сообщения для игрока с указанной ролью.

Основные события сервера:

- `changeGamePhase` - смена этапа игры: `lobby`, `cards`, `game`.
- `lobbyUpdate` - обновление списка игроков.
- `sendRoles` / `rolesUpdate` - список ролей.
- `sendPlayerData` / `updatePlayerData` - данные игрока.
- `sendMessage` - новые сообщения игрока.
- `errorMessage` - ошибка подключения или игрового действия.

## Заметки по текущему состоянию

- Состояние игры хранится в памяти сервера. После перезапуска сервера партия сбрасывается.
- Для реконнекта используется `playerId` в `localStorage`.
- Минимум игроков для старта выбора карточек: `4`.
- Максимум игроков: `10`.
