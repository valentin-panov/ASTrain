import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface IAuthState { token: string | null; expiresAt: string | null; userInfo: any; }
interface TAuthContext { authState: IAuthState; setAuthState: (authInfo: any) => void; logout: () => void; isAuthenticated: () => boolean; isAdmin: () => boolean; }

const defaultAuthState: IAuthState = { token: null, expiresAt:  null, userInfo: 'any' }
const defaultContext: TAuthContext = { authState: defaultAuthState, setAuthState: () => {}, logout: () => {}, isAuthenticated: () => false, isAdmin: () => false}

const AuthContext: React.Context<TAuthContext> = createContext(defaultContext);
const { Provider } = AuthContext;

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }: IAuthState) => {
    localStorage.setItem('token', token || '');
    localStorage.setItem(
      'userInfo',
      JSON.stringify(userInfo)
    );
    localStorage.setItem('expiresAt', expiresAt || "");

    setAuthState({
      token,
      userInfo,
      expiresAt
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    setAuthState(defaultAuthState);
    history.push('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return (
      new Date().getTime() / 1000 < Number(authState.expiresAt)
    );
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
