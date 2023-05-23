import React, { useEffect, useMemo } from "react";
import styles from "./BaseService.module.scss";
import { AccountSummaryService } from "@services/index";

interface Props {
  payload: string;
}

const BaseServiceComponent: React.FC<Props> = ({ payload }) => {
  const sample = `BaseService ${payload}`;

  const ASService = useMemo(() => new AccountSummaryService(), []);

  useEffect(() => {
    ASService.get().then(() => {});
  }, [ASService]);

  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}></div>
    </>
  );
};

export default BaseServiceComponent;
