import React, { createContext, useEffect, useState } from "react";
import { IAuthState, TAuthContext } from "@interfaces/IAuth";
import { useRouter } from "next/router";
import { storage } from "@utils/storage";

const defaultAuthState: IAuthState = {
  token: null,
  expiresAt: null,
  userInfo: {
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  },
};
const defaultContext: TAuthContext = {
  authState: defaultAuthState,
  setAuthState: () => {},
  logout: () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
};

const AuthContext: React.Context<TAuthContext> = createContext(defaultContext);
AuthContext.displayName = "AuthContext";

const { Provider } = AuthContext;

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<IAuthState>(defaultAuthState);

  const getStateFromLocalStorage = () => {
    try {
      return {
        token: storage.get("token"),
        expiresAt: storage.get("expiresAt"),
        userInfo: JSON.parse(storage.get("userInfo") || ""),
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
      storage.set("token", token || "");
      storage.set("userInfo", JSON.stringify(userInfo));
      storage.set("expiresAt", expiresAt || "");
    }
    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    clearStorage();
    setAuthState(defaultAuthState);
    router.push("/login").then();
  };

  const clearStorage = () => {
    if (typeof window !== "undefined") {
      storage.remove("token", "userInfo", "expiresAt");
    }
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    if (new Date().getTime() / 1000 > Number(authState.expiresAt)) {
      clearStorage();
      return false;
    }
    return true;
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
