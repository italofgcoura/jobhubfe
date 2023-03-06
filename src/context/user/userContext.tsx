import { createContext, useContext, useState, useEffect, useMemo } from 'react';

import { IProps, IUser, IUserContext, INotifications, IUserData, ICategories } from '../../interfaces/userInterfaces';

import makeRequest from '../../utils/makeRequest';

import {
  getNotificationsRequest,
  getUserRequest,
  getUserDataRequest,
  updateUserDataRequest,
  createNewUserRequest
} from '../../requests/user';

import { listCategories } from '../../requests/categorie';

import initialValues from './initialValues';

import { AuthContext } from '../auth/authContext';
import { registerWithEmailAndPassword } from '../../firebase';

const initial = {};

const UserContext = createContext<IUserContext>(initial as IUserContext);

const UserProvider = ({ children }: IProps) => {

  const [user, setUser] = useState<IUser>(initialValues.user);

  const [userData, setUserData] = useState<IUserData>(initialValues.userData);

  const [loadingHome, setIsLoadingHome] = useState(initialValues.loadingHome);

  const [categories, setCategories] = useState<ICategories>(initialValues.categories);

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

    const categories: ICategories = await makeRequest(listCategories, setHomeError, setIsLoadingUserData);

    if (resUserData) {
      if (resUserData.isCompany) {
        setIsCompany(true);
      }
      if (resUserData.isAdmin) {
        setIsAdmin(true);
      }
      console.log('resUserDataresUserDataresUserData', resUserData);
      setUserData(resUserData);
    }

    if (categories) {
      setCategories(categories);
    }

  };

  const updateUserData = async (updatedUserData: object) => {
    console.log('updatedUserData', updatedUserData);
    await makeRequest(
      updateUserDataRequest,
      setUpdateUserError,
      setUpdatingUserData,
      updatedUserData);
  };

  const createNewUser = async (userLoginData: { name: string, email: string, password: string }) => {
    setLoadingCreatingNewUser(true);
    // const created = await makeRequest(createNewUserRequest, setErrorCreatingNewUser, setLoadingCreatingNewUser, userLoginData);

    // const created = await makeRequest(registerWithEmailAndPassword, setErrorCreatingNewUser, setLoadingCreatingNewUser, userLoginData);


    const created = await registerWithEmailAndPassword(userLoginData.name, userLoginData.email, userLoginData.password);
    console.log('created', created);

    if (created) {

      const createdUserInDataBase = await makeRequest(createNewUserRequest, setErrorCreatingNewUser, setLoadingCreatingNewUser, { ...userLoginData, userId: created.uid });

      console.log('createdUserInDataBase', createdUserInDataBase);


      const idToken = await created.getIdToken(false);
      console.log('idToken', idToken);
      authenticateUser(idToken, created.refreshToken);
    }
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
    categories,
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
    categories,
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
