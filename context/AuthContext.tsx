import React, { createContext, useEffect, useState } from "react";
import { IAuthState, TAuthContext } from "../interfaces/IAuth";
import { useRouter } from "next/router";

const defaultAuthState: IAuthState = {
  token: null,
  expiresAt: null,
  userInfo: null,
};
const defaultContext: TAuthContext = {
  authState: defaultAuthState,
  setAuthState: () => {},
  logout: () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
};

const AuthContext: React.Context<TAuthContext> = createContext(defaultContext);
const { Provider } = AuthContext;

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<IAuthState>(defaultAuthState);

  const getStateFromLocalStorage = () => {
    try {
      return {
        token: localStorage.getItem("token"),
        expiresAt: localStorage.getItem("expiresAt"),
        userInfo: JSON.parse(localStorage.getItem("userInfo") || ""),
      };
    } catch {
      return defaultAuthState;
    }
  };

  useEffect(() => {
    setAuthState(getStateFromLocalStorage());
  }, []);

  const setAuthInfo = ({ token, userInfo, expiresAt }: IAuthState) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token || "");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("expiresAt", expiresAt || "");
    }
    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expiresAt");
    }
    setAuthState(defaultAuthState);
    router.push("/login");
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < Number(authState.expiresAt);
  };

  const isAdmin = () => {
    return authState.userInfo?.role === "admin";
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
