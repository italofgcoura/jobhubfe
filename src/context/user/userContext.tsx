import { createContext, useContext, useState, useMemo } from 'react';

import { IProps, IUser, IUserContext, INotifications, IUserData, } from '../../interfaces/userInterfaces';

import makeRequest from '../../utils/makeRequest';

import {
  getNotificationsRequest,
  getUserRequest,
  getUserDataRequest,
  updateUserDataRequest,
  createNewUserRequest
} from '../../requests/user';

// import { LanguageContext } from '../language';

import initialValues from './initialValues';

import { AuthContext } from '../auth/authContext';
import { registerWithEmailAndPassword } from '../../firebase';

const initial = {};

const UserContext = createContext<IUserContext>(initial as IUserContext);

const UserProvider = ({ children }: IProps) => {

  // const { handleChangeLanguage } = useContext(LanguageContext);

  const [user, setUser] = useState<IUser>(initialValues.user);

  const [userData, setUserData] = useState<IUserData>(initialValues.userData);

  const [loadingHome, setIsLoadingHome] = useState(initialValues.loadingHome);

  const [loadingUserData, setIsLoadingUserData] = useState(initialValues.loadingUserData);

  const [homeError, setHomeError] = useState(false);

  const [updateUserError, setUpdateUserError] = useState(false);

  const [updatingUserData, setUpdatingUserData] = useState(initialValues.updatingUserData);

  const [notificationsError, setNotificationsError] = useState(false);

  const [notifications, setNotifications] = useState<INotifications>(initialValues.notifications);

  const [isCompany, setIsCompany] = useState(initialValues.userData.isCompany);

  const [isAdmin, setIsAdmin] = useState(initialValues.userData.isAdmin);

  const [loadingCreatingNewUser, setLoadingCreatingNewUser] = useState(false);
  const [errorCreatingNewUser, setErrorCreatingNewUser] = useState(false);

  const [newUserCreated, setNewUserCreated] = useState(initialValues.newUserCreated);

  const { authenticateUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setIsLoadingUserData(false);
  //     setIsLoadingHome(false);
  //   }
  // }, [isAuthenticated]);

  const loadUser = async () => {

    const user: IUser = await makeRequest(getUserRequest, setHomeError, setIsLoadingHome);

    if (user) {
      setUser(user);
    }

    const userNotifications = await makeRequest(getNotificationsRequest, setNotificationsError, setIsLoadingHome);

    if (userNotifications) {
      setNotifications(userNotifications);
    }

  };

  const loadUserData = async () => {

    const resUserData: IUserData = await makeRequest(getUserDataRequest, setHomeError, setIsLoadingUserData);

    if (resUserData) {
      if (resUserData.isCompany) {
        setIsCompany(true);
      }
      if (resUserData.isAdmin) {
        setIsAdmin(true);
      }

      // handleChangeLanguage();
      setUserData(resUserData);
    }

  };

  const updateUserData = async (updatedUserData: object) => {

    await makeRequest(
      updateUserDataRequest,
      setUpdateUserError,
      setUpdatingUserData,
      updatedUserData);
  };

  const createNewUser = async (userLoginData: { name: string, email: string, password: string }) => {

    setLoadingCreatingNewUser(true);

    const created = await registerWithEmailAndPassword(userLoginData.name, userLoginData.email, userLoginData.password);

    if (created) {

      await makeRequest(createNewUserRequest, setErrorCreatingNewUser, setLoadingCreatingNewUser, { ...userLoginData, userId: created.uid });

      const idToken = await created.getIdToken(false);

      authenticateUser(idToken, created.refreshToken);

      return;
    }

    setLoadingCreatingNewUser(false);
  };

  const resetUser = () => {
    setUser(initialValues.user);
    setUserData(initialValues.userData);
    setIsLoadingHome(initialValues.loadingHome);
    setIsLoadingUserData(initialValues.loadingUserData);
    setIsCompany(initialValues.isCompany);
  };

  const values = useMemo(() => ({
    user,
    loadUser,
    loadUserData,
    loadingHome,
    homeError,
    notificationsError,
    notifications,
    userData,
    loadingUserData,
    updateUserData,
    updatingUserData,
    isAdmin,
    isCompany,
    createNewUser,
    errorCreatingNewUser,
    newUserCreated,
    loadingCreatingNewUser,
    resetUser
  }), [user,
    loadUser,
    loadUserData,
    loadingHome,
    homeError,
    notificationsError,
    notifications,
    userData,
    loadingUserData,
    updateUserData,
    updatingUserData,
    isAdmin,
    isCompany,
    createNewUser,
    errorCreatingNewUser,
    newUserCreated,
    loadingCreatingNewUser,
    resetUser]
  );

  return (
    <UserContext.Provider value={values} >
      {children}
    </ UserContext.Provider>
  );
};

export { UserContext, UserProvider };
