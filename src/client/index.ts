import axios from 'axios';

import { auth } from '../firebase/index';

const api = axios.create(
  {
    baseURL: 'https://jobhub-k98c.onrender.com',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff'
    }
  }
);

api.interceptors.response.use(response => {
  console.log(response);
  return response;
}, async error => {

  if (error.response.status === 401) {
    console.log('1000');

    const token = await auth.currentUser?.getIdToken(true);

    if (token) {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      localStorage.setItem('authToken', token);

      return api.request(error.config);
    }
  }

});


export default api;
