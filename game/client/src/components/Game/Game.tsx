import React, {useState, useEffect} from 'react';
import {EventData, Player} from '../../types';
import {socket} from '../../socket';

import styles from './styles.module.css';

import ActionsModal from '../ActionsModal/ActionsModal';
import LoadingPage from '../LoadingPage/LoadingPage';

const Game: React.FC = () => {
  const [isActionsModal, setIsActionsModal] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [count, setCount] = useState<number>(0);
  const [messages, setMessages] = useState<EventData[]>([]);

  const getLocalStorage = (): number | null => {
    const item = localStorage.getItem('playerId');
    if (item === null) {
      return null;
    }

    const num = Number(item);
    return isNaN(num) ? null : num;
  };

  const createLocalStorage = (playerId: number): void => {
    localStorage.setItem('playerId', JSON.stringify(playerId));
  };

  const onOpen = (): void => {
    setIsActionsModal(true);
  };

  useEffect(() => {
    const playerId = getLocalStorage();

    if (playerId === null) {
      socket.emit('getPlayerData');
    } else {
      socket.emit('getPlayerData', playerId);
    }

    const handlePlayerData = (newPlayerData: Player) => {
      setPlayerData(newPlayerData);

      if (newPlayerData?.playerId !== undefined) {
        createLocalStorage(newPlayerData.playerId);
      }
    };

    const handleMessage = (newMessages: EventData[]) => {
      setMessages(newMessages);
      setCount(newMessages.length);
    };

    socket.on('sendPlayerData', handlePlayerData);
    socket.on('updatePlayerData', handlePlayerData);
    socket.on('sendMessage', handleMessage);

    return () => {
      socket.off('sendPlayerData', handlePlayerData);
      socket.off('updatePlayerData', handlePlayerData);
      socket.off('sendMessage', handleMessage);
    };
  }, []);

  return playerData ? (
    <div className={styles.conteiner}>
      {isActionsModal && (
        <ActionsModal
          playerData={playerData}
          setIsActionsModal={setIsActionsModal}
          messages={messages}
        />
      )}

      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h4 className={styles.title}>ФАБРИКА ПРОЦЕССОВ</h4>
        </div>
        <div className={styles.headerPageName}>
          <h2 className={styles.pageName}>КАРТОЧКА ПЕРСОНАЖА</h2>
        </div>
      </header>
      <div className={styles.block}>
        <div className={styles.infoBlock}>
          <div className={styles.cardBlock}>
            <div className={styles.cardBlockImg}>
              <img
                src={playerData?.playerRole?.roleImg}
                className={styles.cardImg}
                alt=''
              />
            </div>
            <div className={styles.cardBlockText}>
              <h4 className={styles.cardText}>
                {playerData?.playerRole?.roleName}
              </h4>
            </div>
          </div>
          <div className={styles.descBlock}>
            <header className={styles.dataTitle}>
              <h4 className={styles.titleText}>Описание персонажа</h4>
            </header>
            <div className={styles.dataText}>
              <div className={styles.textBlock}>
                <img
                  src='/images/profile.png'
                  alt=''
                  className={styles.textImage}
                />
                <p className={styles.text}>
                  {playerData?.playerRole?.roleProfile}
                </p>
              </div>
              <div className={styles.textBlock}>
                <img
                  src='/images/desc.png'
                  alt=''
                  className={styles.textImage}
                />
                <p className={styles.text}>
                  {playerData?.playerRole?.roleDescription}
                </p>
              </div>
              <div className={styles.textBlock}>
                <img
                  src='/images/task.png'
                  alt=''
                  className={styles.textImage}
                />
                <p className={styles.text}>
                  {playerData?.playerRole?.roleTask}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.numberBlock}>
            <header className={styles.dataTitle}>
              <h4 className={styles.titleText}>Номер телефона</h4>
            </header>
            <div className={styles.dataText}>
              <p className={styles.text}>
                {playerData?.playerRole?.roleNumber}
              </p>
            </div>
          </div>
          <div className={styles.passwordBlock}>
            <header className={styles.dataTitle}>
              <h4 className={styles.titleText}>Пароль от Госуслуг</h4>
            </header>
            <div className={styles.dataText}>
              <p className={styles.text}>
                {playerData?.playerRole?.rolePassword}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.buttonBlock}>
          <button className={styles.button} onClick={() => onOpen()}>
            <h4 className={styles.buttonText}>перейти к действиям</h4>
            {count !== 0 && <span className={styles.buttonBadge}>{count}</span>}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default Game;
