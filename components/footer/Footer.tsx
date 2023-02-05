import React, { useState } from "react";
import GradientButton from "../common/buttons/GradientButton";
import AuthDebugger from "../authDebugger/AuthDebugger";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const [showAuthDebugger, setShowAuthDebugger] = useState(false);
  return (
    <footer className={styles.container}>
      <div className={styles.container_4btn}>
        <GradientButton onClick={() => setShowAuthDebugger(!showAuthDebugger)}>
          Auth Debugger
        </GradientButton>
      </div>
      <div className={styles.container_authD}>
        {showAuthDebugger && <AuthDebugger />}
      </div>
    </footer>
  );
};

export default Footer;
