import React, { useEffect, useMemo } from "react";
import styles from "./BaseService.module.scss";
import { AccountSummaryService } from "@services/index";

interface Props {
  payload: string;
}

const BaseServiceComponent: React.FC<Props> = ({ payload }) => {
  const sample = `Service POST URLSearchParams(${payload})`;

  const ASService = useMemo(() => new AccountSummaryService(), []);

  useEffect(() => {
    ASService.post("", new URLSearchParams({ payload: payload }))
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
  }, [ASService, payload]);

  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>CHECK the network tab</div>
    </>
  );
};

export default BaseServiceComponent;
