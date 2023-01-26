import IUser from "./IUser";

export interface IAuthState {
    token: string | null;
    expiresAt: string | null;
    userInfo: IUser;
}

export interface TAuthContext {
    authState: IAuthState;
    setAuthState: (authInfo: any) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
}