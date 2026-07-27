import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Game from "./components/Game/Game";
import Cards from "./components/Cards/Cards";
import Lobby from "./components/Lobby/Lobby";
import ErrorModal from "./components/ErrorModal/ErrorModal";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  isConnected: boolean;
}> = ({ children, isConnected }) => {
  return isConnected ? <>{children}</> : <Navigate to="/" replace />;
};

const AppContent: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleConnect(): void {
    if (socket.connected) {
      setIsConnected(true);
      socket.emit("playerConnect", getLocalStorage());
    } else {
      socket.connect();
    }
  }

  const getLocalStorage = (): number | null => {
    const item = localStorage.getItem("playerId");
    if (item === null) {
      return null;
    }

    const num = Number(item);
    return isNaN(num) ? null : num;
  };

  function handleError(message: string): void {
    setIsError(true);
    setMessageError(message);
  }

  useEffect(() => {
    function handleConnectEvent(): void {
      setIsConnected(true);
      socket.emit("playerConnect", getLocalStorage());
    }

    function handleDisconnect(): void {
      setIsConnected(false);
      navigate("/");
    }

    function handleChangeGamePhase(newGamePhase: string): void {
      // Очистка localStorage при переходе на выбор карт (избавление от сохранения данных в localStorage после прошлой игры)
      if (newGamePhase === "cards") {
        localStorage.removeItem("playerId");
      }
      navigate("/" + newGamePhase);
    }

    socket.on("connect", handleConnectEvent);
    socket.on("disconnect", handleDisconnect);
    socket.on("changeGamePhase", handleChangeGamePhase);
    socket.on("errorMessage", handleError);

    return () => {
      socket.off("connect", handleConnectEvent);
      socket.off("disconnect", handleDisconnect);
      socket.off("changeGamePhase", handleChangeGamePhase);
    };
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage handleConnect={handleConnect} />} />
        <Route
          path="/lobby"
          element={
            <ProtectedRoute isConnected={isConnected}>
              <Lobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cards"
          element={
            <ProtectedRoute isConnected={isConnected}>
              <Cards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute isConnected={isConnected}>
              <Game />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isError && messageError && (
        <ErrorModal setIsError={setIsError} messageError={messageError} />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
