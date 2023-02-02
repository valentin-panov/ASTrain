import React from "react";
import styles from "./PageTitle.module.scss";

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => (
  <div className={styles.wrapper}>
    <h2 className={styles.content}>{title}</h2>
  </div>
);

export default PageTitle;
