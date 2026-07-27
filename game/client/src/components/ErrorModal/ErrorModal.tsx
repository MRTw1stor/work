import React from "react";
import styles from "./styles.module.css";

const ErrorModal: React.FC<{
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  messageError: string;
}> = ({ setIsError, messageError }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <h2 className={styles.title}>Ошибка</h2>
          </div>
          <button
            className={styles.headerButton}
            onClick={() => setIsError(false)}
          >
            <img src="/images/close.png" alt="close modal" />
          </button>
        </div>
        <div className={styles.modalBlock}>
          <h3 className={styles.errorText}>{messageError}</h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
