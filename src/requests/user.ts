import api from '../client';

const getUserRequest = async () => {
  const result = await api.get('/user');

  return result.data;
};

const getNotificationsRequest = async () => {
  const result = await api.get('/notifications');

  return result.data;
};

const getUserDataRequest = async () => {
  const result = await api.get('/user-data');

  return result.data;
};


const updateUserDataRequest = async (userData: object) => {
  const result = await api.patch('/user-data', userData);

  return result.data;
};

const createNewUserRequest = async (newUserData: object) => {
  const result = await api.post('/new-user', {
    ...newUserData
  });

  return result.data;
};

export { getUserRequest, getNotificationsRequest, getUserDataRequest, updateUserDataRequest, createNewUserRequest };
