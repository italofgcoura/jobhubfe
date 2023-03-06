import { createContext, useEffect, useRef } from 'react';

import { IAuthContext, IProps, } from '../../interfaces/authInterfaces';

import useAuth from '../../hooks/auth';

import initialValues from './initialValues';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';

import expiratedToken from '../../utils/expiratedToken';

import { auth, firebaseConfig, initializeApp } from '../../firebase/firebaseConfig';

const AuthContext = createContext<IAuthContext>(initialValues);

const AuthProvider = ({ children }: IProps) => {

  const { isAuthenticated, handleLogin, loginError,
    loading, handleLogout, authenticateUser,
    isLoginIn, handleFederatedLogin, setLoginError } = useAuth();

  const loaded = useRef(false);

  const handleLoginError = () => {
    setLoginError(false);
  };

  const refresh = async () => {

    auth.onAuthStateChanged(async user => {

      console.log('useruseruseruser', user);

      if (!user) {
        handleLogout();
        return;
      }

      const tokens = await auth.currentUser?.getIdToken(true);

      if (tokens) {
        authenticateUser(tokens);
        return;
      }

    });
  };

  useEffect(() => {

    if (!loaded.current) {

      initializeApp(firebaseConfig);

      loaded.current = true;

      const token = localStorage.getItem('authToken');

      if (token) {

        if (expiratedToken()) {

          refresh();

        } else {

          authenticateUser(token);

        }

      } else {
        handleLogout();
      }
    }
  }, []);

  if (loading) return <Modal><Spinner centered size={84} /></Modal>;

  return (
    <AuthContext.Provider value={{
      isAuthenticated, handleLogin, loginError,
      loading, handleLogout, authenticateUser, isLoginIn, handleFederatedLogin,
      handleLoginError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
