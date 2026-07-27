import React from "react";

import styles from "./styles.module.css";

interface StartPageProps {
  handleConnect: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ handleConnect }) => {
  return (
    <div className={styles.conteiner}>
      <header className={styles.header}>
        <img className={styles.img} src="./images/gerb.png" alt="" />
        <img className={styles.img} src="./images/cso.png" alt="" />
        <img className={styles.img} src="./images/tsur.png" alt="" />
      </header>
      <div className={styles.block}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>ФАБРИКА ПРОЦЕССОВ</h1>
          <h3 className={styles.text}>Совершенствуй, играя!</h3>
        </div>
        <div className={styles.infoBlock}>
          <h4 className={styles.infoText}>
            <span className={styles.infoText_span}>P.S.</span> Помните: даже
            маленькое улучшение лучше большого беспорядка
          </h4>
          <div className={styles.buttonBlock}>
            <button className={styles.button} onClick={() => handleConnect()}>
              <h4 className={styles.buttonText}>играть</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
