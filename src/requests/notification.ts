import api from '../client';

const listUserNotifications = async () => {
  const notificatons = await api.get('/notifications');

  return notificatons.data;
};

export { listUserNotifications };
