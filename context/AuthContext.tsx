import React, { createContext, useEffect, useState } from "react";
import { IAuthState, TAuthContext } from "../interfaces/IAuth";
import { useRouter } from "next/router";

const defaultAuthState: IAuthState = {
  token: null,
  expiresAt: null,
  userInfo: {
    avatar: "",
    firstName: "John",
    lastName: "Doe",
    bio: "ruthless developer",
    email: "john@doe.com",
    role: "user",
    password: "",
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
const { Provider } = AuthContext;

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserInfo(localStorage.getItem("userInfo"));
    setExpiresAt(localStorage.getItem("expiresAt"));
  }, []);

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

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
    return authState.userInfo.role === "admin";
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
