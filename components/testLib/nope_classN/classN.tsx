import React from "react";
import styles from "./classN.module.scss";

interface Props {
  payload: string;
}

const ClassN: React.FC<Props> = ({ payload }) => {
  return (
    <>
      <h2>className injection</h2>
      <div className={styles.code}>
        <p className={payload}>
          I&apos;m a &lt;p&nbsp;className={`{payload} /`}&gt;. Inspect me!
        </p>
      </div>
    </>
  );
};

export default ClassN;
