import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import PlayerCard from "../PlayerCard/PlayerCard";

import styles from "./styles.module.css";
import { Player } from "../../types";

const Lobby: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  const onReady = () => {
    setIsReady(true);
    socket.emit("playerIsReady");
  };

  useEffect(() => {
    const onLobbyUpdate = (updatedPlayers: Player[]): void => {
      const currentPlayer = updatedPlayers.find(
        (player) => player.playerSocket === socket.id
      );

      setIsReady(Boolean(currentPlayer?.isReady));
      setPlayers(updatedPlayers);
    };

    socket.on("lobbyUpdate", onLobbyUpdate);
    socket.emit("getLobby");

    return () => {
      socket.off("lobbyUpdate", onLobbyUpdate);
    };
  }, []);

  return (
    <div className={styles.conteiner}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h4 className={styles.title}>ФАБРИКА ПРОЦЕССОВ</h4>
        </div>
        <div className={styles.headerCounter}>
          <h2 className={styles.counter}>
            Игроков: {players.length} из {Math.max(players.length, 4)}
          </h2>
        </div>
      </header>
      <div className={styles.block}>
        <div className={styles.players}>
          {Array.from({ length: 10 }).map((_, index) => {
            const player = players[index];

            if (!player) {
              return <div className={styles.socket} key={index}></div>;
            }

            return (
              <div className={styles.socket} key={index}>
                <PlayerCard
                  playerId={player.playerId}
                  isReady={player.isReady}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.footer}>
          {isReady ? (
            <div className={styles.waitingBlock}>
              <h4 className={styles.waitingText}>ожидайте остальных игроков</h4>
            </div>
          ) : (
            <button onClick={onReady} className={styles.button}>
              <h4 className={styles.buttonText}>готов</h4>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
