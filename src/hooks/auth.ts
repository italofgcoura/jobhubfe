import React, { useState } from 'react';

import api from '../client';

import { createNewUserRequest, getUserDataRequest } from '../requests/user';

import { signInWithEmailAndPassword, auth, logout, signInWithGoogle } from '../firebase';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  const [isLoginIn, setIsLoginIn] = useState(false);

  const [loginError, setLoginError] = useState(false);


  const authenticateUser = (token: string) => {

    setIsAuthenticated(true);

    api.defaults.headers.common['authorization'] = `Bearer ${token}`;

    localStorage.setItem('authToken', token);

    setLoading(false);
  };

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string, password: string) => {

    setIsLoginIn(true);

    event.preventDefault();

    try {

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {

        const token = await user.getIdToken(false);

        authenticateUser(token);

        return;

      }

    } catch (error) {

      setLoginError(true);

    } finally {

      setIsLoginIn(false);

    }

  };

  const handleFederatedLogin = async () => {

    try {
      const googleUser = await signInWithGoogle();

      if (googleUser?.email) {

        setIsLoginIn(true);

        const token = await googleUser.getIdToken();

        try {

          if (token) {

            api.defaults.headers.common['authorization'] = `Bearer ${token}`;

            await getUserDataRequest();
          }
        } catch (error) {

          await createNewUserRequest({
            userId: googleUser.uid,
            name: googleUser.displayName, email: googleUser.email
          });

        } finally {
          authenticateUser(token);
          setIsLoginIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleLogout = () => {

    setIsAuthenticated(false);

    localStorage.removeItem('authToken');
    api.defaults.headers.common['authorization'] = undefined;
    setLoading(false);
    logout();
  };

  return {
    isAuthenticated, handleLogin, loginError, loading, handleLogout,
    authenticateUser, isLoginIn, handleFederatedLogin, setLoginError, setLoading
  };
}
