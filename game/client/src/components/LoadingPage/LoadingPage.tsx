import React from "react";

import styles from "./styles.module.css";

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingCircle}></div>
      <div className={styles.loadingText}>
        <h3 style={{ fontWeight: 700 }}>Ожидайте</h3>
      </div>
    </div>
  );
};

export default LoadingPage;
