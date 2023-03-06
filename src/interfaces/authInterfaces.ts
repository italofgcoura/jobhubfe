import { ReactNode, } from 'react';

interface IAuthContext {
  isAuthenticated: boolean,
  loginError: boolean,
  loading: boolean,
  handleLogin: (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => void,
  handleLogout: () => void,
  authenticateUser: (token: string, refreshToken: string) => void,
  isLoginIn: boolean,
  handleFederatedLogin: () => void,
  handleLoginError: () => void
}

interface IProps {
  children?: ReactNode;
}

interface ITokens {
  data: {
    token: string,
    refreshToken: string
  }
}

interface IToken {
  exp: number,
  iat: number,
  id: string,
}

interface IRefreshedTokens {
  data: {
    token: string,
    refreshToken: string
  }
}

export type { IAuthContext, IProps, ITokens, IToken, IRefreshedTokens };
