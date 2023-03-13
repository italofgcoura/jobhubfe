import api from '../client';

const listUserNotifications = async () => {
  const notificatons = await api.get('/notifications');

  console.log('notificaionts', notificatons);
};

export { listUserNotifications };
