import { useEffect, useState, useContext, useRef } from 'react';
import { DefaultTheme } from 'styled-components';

import SvgIcon from '../SvgIcon';

import socketIo from 'socket.io-client';

import { UserContext } from '../../context/user/userContext';

import { listUserNotifications } from '../../requests/notification';

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

  const [userNotifications, setUserNotifications] = useState([]);

  const isLoaded = useRef(false);

  const loadUserNotifications = async () => {
    try {
      const res = await listUserNotifications();
      handleAddUserNotifications(res);
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
    setUserNotifications(prevState => prevState.concat(notification));
  };



  useEffect(() => {
    console.log('socket');
    socket.on(userData?.userId, handleAddUserNotifications);

    //   (notification) => {
    //   console.log('nova notificação', notification);
    //   handleAddUserNotifications(notification);
    // });

    return () => { socket.off(userData?.userId, handleAddUserNotifications); };
  }, []);

  console.log('userNotifications', userNotifications);

  return (
    <div
      onClick={() => setShowNotifications(prevState => !prevState)}
      style={{ position: 'relative' }}
    >
      <SvgIcon source='notificationsBell'
        color={userNotifications.length > 0
          ? theme.accent : theme.text
        }
      />

      {userNotifications.length > 0 &&
        <p style={{ position: 'absolute', color: 'red', bottom: 0, right: 0 }}>       <span >{userNotifications.length}</span></p>
      }
      {
        showNotifications &&
        <div style={{
          position: 'absolute', top: '100%',
          right: 0, backgroundColor: '#ffffff',
          width: '250px'
        }}>
          <div>
            {userNotifications.map((notification: any) => <>
              <p key={notification.notificationId}>{notification?.notificationText}</p>

              <Link to={`/vagas/detalhes/${notification.jobId}`} state={{ loadDetails: true }}

              >clique aqui para visualizar</Link>
            </>
            )}
          </div>
        </div>

      }
    </div >
  );
};
