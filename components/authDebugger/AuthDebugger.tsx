import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IAuthStateItem } from "../../interfaces/IAuth";
import styles from "./AuthDebugger.module.scss";
import classNames from "classnames";

const AuthStateItem: React.FC<IAuthStateItem> = ({ title, value }) => (
  <div className={styles.container}>
    <p className={classNames(styles.title, styles.mb_2)}>{title}</p>
    <pre className={styles.pre_wrap}>
      <code className={styles.code}>{value}</code>
    </pre>
  </div>
);

const AuthDebugger: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { token, expiresAt, userInfo } = authContext.authState;
  return (
    <section className={styles.section}>
      <div className={styles.mb_2}>
        <AuthStateItem title="Token" value={token} />
      </div>
      <div className={styles.mb_2}>
        <AuthStateItem title="Expiry" value={expiresAt} />
      </div>
      <div className={styles.mb_2}>
        <AuthStateItem
          title="User Info"
          value={JSON.stringify(userInfo, null, 2)}
        />
      </div>
    </section>
  );
};

export default AuthDebugger;
