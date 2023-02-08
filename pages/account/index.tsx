import React, { useContext, useState } from "react";
import { FetchContext } from "@context/FetchContext";
import { AuthContext } from "@context/AuthContext";
import { AxiosError } from "axios";
import { MainLayout } from "../../layouts";
import classNames from "classnames";
import { Card, PageTitle } from "../../components";
import s from "./Account.module.scss";

const Account: React.FC = () => {
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setUserRole = async (role: string) => {
    try {
      const { data } = await fetchContext.authAxios.patch("user-role", {
        role,
      });
      setSuccessMessage(data.message);
      setErrorMessage("");
    } catch (err: unknown) {
      setSuccessMessage("");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        const error = err as AxiosError;
        setErrorMessage(error?.response?.data.message || "Unexpected error");
      }
    }
  };

  return (
    <MainLayout>
      <PageTitle title="Account" />
      <Card>
        <p className={s.card_header}>User Role</p>
        <div className={s.card_wrapper}>
          <p className={s.card_cta}>Select a role for yourself</p>
          <div className={s.card_selectBlock}>
            <select
              defaultValue={auth.authState.userInfo?.role}
              onChange={(e) => setUserRole(e.target.value)}
              className={s.card_selectBlock_select}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {successMessage && (
              <p className={classNames(s.message, s.message_success)}>
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className={classNames(s.message, s.message_error)}>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Account;
