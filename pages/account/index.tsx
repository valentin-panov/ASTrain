import React, { useContext, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import Card from "../../components/common/Card";
import { FetchContext } from "../../context/FetchContext";
import { AuthContext } from "../../context/AuthContext";
import { AxiosError } from "axios";
import { MainLayout } from "../../layouts";

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
    } catch (err: unknown) {
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
        <p className="font-bold">User Role</p>
        <div className="mt-4">
          <p>Select a role for yourself</p>
          <div className="mt-2 flex">
            <select
              defaultValue={auth.authState.userInfo.role}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {successMessage && (
              <p className="text-green-700 ml-4">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 ml-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Account;
