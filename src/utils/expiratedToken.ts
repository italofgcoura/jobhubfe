import jwt_decode from 'jwt-decode';

import { IToken } from '../interfaces/authInterfaces';

export default () => {

  const token = localStorage.getItem('authToken');

  if (token) {
    const decodedJwt = jwt_decode<IToken>(token);

    if (Date.now() > decodedJwt.exp * 1000) {
      return true;
    }
  }
};
