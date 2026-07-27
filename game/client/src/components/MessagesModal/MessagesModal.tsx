import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { EventData } from "../../types";
import MessageModal from "../MessageModal/MessageModal";

const MessagesModal: React.FC<{
  setIsMessagesModal: React.Dispatch<React.SetStateAction<boolean>>;
  messages: EventData[];
}> = ({ setIsMessagesModal, messages }) => {
  const [isMessageModal, setIsMessageModal] = useState<boolean>(false);
  const [message, setMessage] = useState<EventData | null>(null);

  useEffect(() => {
    if (!messages) {
      return;
    }
  }, [messages]);

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalBox}>
          <div className={styles.modalHeader}>
            <div className={styles.modalTitle}>
              <h2 className={styles.title}>Сообщения</h2>
            </div>
            <button
              className={styles.headerButton}
              onClick={() => setIsMessagesModal(false)}
            >
              <img src="/images/close.png" alt="close modal" />
            </button>
          </div>
          <div className={styles.modalButtons}>
            {messages.map((message, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setMessage(message);
                    setIsMessageModal(true);
                  }}
                  className={styles.button}
                >
                  {message.dataText && (
                    <div className={styles.buttonDesc}>
                      <p>{message.dataText}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isMessageModal && message && (
        <MessageModal setIsMessageModal={setIsMessageModal} message={message} />
      )}
    </>
  );
};

export default MessagesModal;
