import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import { GameRole } from "../../types";
import Card from "../Card/Card";

import styles from "./styles.module.css";
import LoadingPage from "../LoadingPage/LoadingPage";

const Cards: React.FC = () => {
  const [roles, setRoles] = useState<GameRole[]>([]);
  const [playerSelect, setPlayerSelect] = useState<boolean>(false);

  useEffect(() => {
    socket.emit("getRoles");

    const handleRolesUpdate = (roles: GameRole[]): void => {
      setRoles(roles);
    };

    socket.on("sendRoles", handleRolesUpdate);
    socket.on("rolesUpdate", handleRolesUpdate);

    return () => {
      socket.off("sendRoles", handleRolesUpdate);
      socket.off("rolesUpdate", handleRolesUpdate);
    };
  }, []);

  if (roles.length === 0) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.conteiner}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h4 className={styles.title}>ФАБРИКА ПРОЦЕССОВ</h4>
        </div>
        <div className={styles.headerPageName}>
          <h2 className={styles.pageName}>ПЕРСОНАЖИ</h2>
        </div>
      </header>
      <div className={styles.block}>
        <div className={styles.cards}>
          {roles.map((role) => {
            return (
              <Card
                key={role.roleId}
                roleId={role.roleId}
                roleName={role.roleName}
                roleImg={role.roleImg}
                isSelected={role.isSelected}
                playerSelect={playerSelect}
                setPlayerSelect={setPlayerSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
