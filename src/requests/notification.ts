import api from '../client';

const listUserNotifications = async () => {
  const notificatons = await api.get('/notifications');

  return notificatons.data;
};

const markNewNotificationAsRead = async () => {
  const marked = await api.patch('/notifications/visualized');
  return marked;
};

const markNotificationAsRead = async (notificationId: string) => {
  const marked = await api.patch('/notifications/notification-visualized',
    { notificationId });

  return marked;
};

export {
  listUserNotifications,
  markNewNotificationAsRead,
  markNotificationAsRead
};
