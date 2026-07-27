import React, { useEffect } from "react";

import styles from "./styles.module.css";
import { EventData } from "../../types";

const MessageModal: React.FC<{
  setIsMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: EventData;
}> = ({ setIsMessageModal, message }) => {
  useEffect(() => {
    if (!message) {
      return;
    }
  }, [message]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <div className={styles.titleMark}>
              <h4>!</h4>
            </div>
            <h2 className={styles.title}>{message.dataText}</h2>
          </div>
          <button
            className={styles.headerButton}
            onClick={() => setIsMessageModal(false)}
          >
            <img src="/images/close.png" alt="close modal" />
          </button>
        </div>
        <div className={styles.modalButtons}>
          {message.dataButtons.map((button, index) => {
            const isIndexStyle = index % 2 === 0 ? true : false;
            return (
              <div className={styles.buttonBlock} key={index}>
                <button
                  className={`${
                    isIndexStyle ? styles.acceptButton : styles.cancleButton
                  }`}
                >
                  <h4>{button.buttonText}</h4>
                </button>
                {button.buttonDesc && (
                  <p className={styles.buttonDesc}>{button.buttonDesc}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
