import expiratedToken from './expiratedToken';

import { auth } from '../firebase';

import api from '../client';

export default async (
  callback: any,
  setErrorFlag?: any,
  setLoading?: any,
  args?: any
) => {

  try {
    setLoading(true);

    if (expiratedToken()) {

      const token = await auth.currentUser?.getIdToken();

      if (token) {
        localStorage.setItem('authToken', token);
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      }
    }

    const res = await callback(args);

    return res;

  } catch (error) {
    console.log('ERRORRR', error);
    setErrorFlag(true);

  } finally {

    setLoading(false);

  }

};
