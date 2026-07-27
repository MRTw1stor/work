import React, { useState } from "react";
import { EventData, Player } from "../../types";
import PhoneModal from "../PhoneModal/PhoneModal";

import styles from "./styles.module.css";
import { socket } from "../../socket";
import MessagesModal from "../MessagesModal/MessagesModal";

const ActionsModal: React.FC<{
  playerData: Player | null;
  setIsActionsModal: React.Dispatch<React.SetStateAction<boolean>>;
  messages: EventData[];
}> = ({ playerData, setIsActionsModal, messages }) => {
  const [isPhoneModal, setIsPhoneModal] = useState<boolean>(false);
  const [isMessagesModal, setIsMessagesModal] = useState<boolean>(false);

  const openMessagesModal = (): void => {
    setIsMessagesModal(true);
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalBox}>
          <div className={styles.modalHeader}>
            <div className={styles.modalTitle}>
              <h2 className={styles.title}>Выберите одно из действий</h2>
            </div>
            <button
              className={styles.headerButton}
              onClick={() => setIsActionsModal(false)}
            >
              <img src="/images/close.png" alt="close modal" />
            </button>
          </div>
          <div className={styles.modalButtons}>
            {playerData?.playerRole?.roleButtons.map((button, index) => {
              return (
                button.isActive && (
                  <button
                    key={index}
                    onClick={() => {
                      console.log("Запуск события", button.buttonEmit);

                      socket.emit(button.buttonEmit, button.buttonData);
                    }}
                    className={styles.button}
                  >
                    <div className={styles.buttonTitle}>
                      {button.buttonImage && (
                        <img src={button.buttonImage} alt="" />
                      )}
                      <h5>{button.buttonTitle}</h5>
                    </div>
                    {button.buttonDesc && (
                      <div className={styles.buttonDesc}>
                        <p>{button.buttonDesc}</p>
                      </div>
                    )}
                  </button>
                )
              );
            })}
          </div>
        </div>

        <div className={styles.actionBox}>
          <div className={styles.actionPhone}>
            <button
              className={styles.phoneButton}
              onClick={() => setIsPhoneModal(true)}
            >
              <img src="/images/phone.png" alt="" />
            </button>
          </div>
          <div className={styles.actionMessage}>
            <button
              className={styles.messageButton}
              onClick={() => openMessagesModal()}
            >
              <p className={styles.buttonText}>Сообщения</p>
              <span className={styles.buttonBadge}>{messages.length}</span>
            </button>
          </div>
        </div>
      </div>

      {isMessagesModal && (
        <MessagesModal
          setIsMessagesModal={setIsMessagesModal}
          messages={messages}
        />
      )}

      {isPhoneModal && <PhoneModal setIsPhoneModal={setIsPhoneModal} />}
    </>
  );
};

export default ActionsModal;
