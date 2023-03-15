import { useEffect, useState, useContext, useRef } from 'react';
import { DefaultTheme } from 'styled-components';

import SvgIcon from '../SvgIcon';

import socketIo from 'socket.io-client';

import { UserContext } from '../../context/user/userContext';

import { JobContext } from '../../context/job/jobContext';

import { listUserNotifications, markNewNotificationAsRead, markNotificationAsRead } from '../../requests/notification';

interface iProps {
  theme: DefaultTheme,
}

import { Link } from 'react-router-dom';

const socket = socketIo('http://localhost:3001', {
  transports: ['websocket'],
});

export default ({ theme }: iProps) => {

  const [showNotifications, setShowNotifications] = useState(false);

  const { userData } = useContext(UserContext);

  const { reloadJobs } = useContext(JobContext);

  const [userNotifications, setUserNotifications] = useState<any>([]);

  const [newNotification, setNewNotification] = useState(false);


  const isLoaded = useRef(false);

  const loadUserNotifications = async () => {
    try {
      const res = await listUserNotifications();
      if (res.notifications.length > 0) {
        setUserNotifications(res.notifications);
      }

      if (res.newNotification === true) {
        console.log('res.newNotification', res.newNotification);
        setNewNotification(res.newNotification);
      }
    } catch (error) {
      console.log('Error loading user notifications', error);
    }
  };

  useEffect(() => {
    if (!isLoaded.current) {
      loadUserNotifications();
      isLoaded.current = true;
    }
  }, []);


  const handleAddUserNotifications = (notification: any) => {


    // const isNewNotification = userNotifications.find((item: any) => { return item.notificationId === notification.notificationId; });

    // // console.log('isNewNotification', notification);
    // if (!isNewNotification) {
    //   const updateNotifications = userNotifications.map((item: any) => {
    //     if (item.notificationId === notification.id) {
    //       return { ...item, notificationText: notification.notificationText };
    //     }
    //     return item;
    //   });
    //   console.log('updateNotifications', updateNotifications);
    //   setUserNotifications(updateNotifications);
    // } else {

    // }
    setUserNotifications((prevState: any) => prevState.filter((item: any) => item.notificationId !== notification.notificationId).concat(notification));
    setNewNotification(true);
  };



  useEffect(() => {

    socket.on(userData?.userId, handleAddUserNotifications);

    // socket.on(userData?.userId, function (notification: string) {

    //   handleAddUserNotifications(notification, userNotifications);
    // });

    return () => { socket.off(userData?.userId, handleAddUserNotifications); };

  }, []);

  const handleMarkVisualized = async () => {
    try {
      await markNewNotificationAsRead();
    } catch (error) {
      console.log('Error marking as visualized', error);
    }
  };

  const handleBellNotificationsClick = async () => {
    if (newNotification) {
      handleMarkVisualized();
      setNewNotification(false);
    }
    setShowNotifications(prevState => !prevState);
  };

  const handleReadNotification = (notification: any) => {
    if (!notification.visualized) {
      markNotificationAsRead(notification.notificationId);
      reloadJobs();
    }
  };

  return (
    <div
      onClick={handleBellNotificationsClick}
      style={{ position: 'relative' }}
    >
      <SvgIcon source='notificationsBell'
        color={userNotifications.length > 0
          ? theme.accent : theme.text
        }
      />

      {newNotification &&
        <p style={{
          position: 'absolute', color: 'red',
          bottom: 5, right: -2, fontSize: 12, padding: 2, backgroundColor: theme.text, borderRadius: '50%',
          width: 10, height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
        }}>       <span >{userNotifications.filter((i: any) => !i.visualized).length}</span></p>
      }
      {
        showNotifications &&
        <div style={{
          position: 'absolute', top: '100%',
          right: 0, backgroundColor: '#ffffff',
          width: '500px'
        }}>
          <div>
            {userNotifications.map((notification: any) => <div style={{ borderBottom: '1px solid red' }}>
              <p key={notification.notificationId}>{notification?.notificationText}</p>

              <Link to={`/vagas/detalhes/${notification.jobId}`} state={{ loadDetails: true }}
                onClick={() => handleReadNotification(notification)}
              >clique aqui para visualizar</Link>
            </div>
            )}
          </div>
        </div>

      }
    </div >
  );
};
