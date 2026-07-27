import React from "react";

import styles from "./styles.module.css";

const PhoneModal: React.FC<{
  setIsPhoneModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsPhoneModal }) => {
  const acceptCall = (): void => {
    setIsPhoneModal(false);
  };

  const cancleCall = (): void => {
    setIsPhoneModal(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.telephoneBox}>
        <img src="/images/telephone.png" alt="" className={styles.telephone} />
        <div className={styles.telephoneButtons}>
          <button
            className={styles.telephoneButton}
            onClick={() => acceptCall()}
          >
            <img src="/images/accept-button.png" alt="" />
          </button>

          <button
            className={styles.telephoneButton}
            onClick={() => cancleCall()}
          >
            <img src="/images/cancle-button.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
