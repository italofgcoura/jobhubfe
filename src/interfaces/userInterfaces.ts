interface IUser {
  userId: string,
  userEmail: string,
  clientType: string[],
}

interface INotification {
  notificationId: string,
  text: string,
  type: string,
  userType: string[]
}

type INotifications = Array<INotification>

interface IProps {
  children?: React.ReactNode;
}

interface ICategorie {
  _id: string,
  name: string
}

interface IUserData {
  name: string,
  email: string,
  isAdmin: boolean,
  isCompany: boolean,
  userDescription: string,
  userTechnologies: ICategorie[],
  cnpj: string,
  userId?: string
}

type IUsers = Array<IUserData>

type ICategories = Array<ICategorie>

interface IUserContext {
  user: IUser,
  loadUser: () => void,
  loadUserData: () => void,
  updateUserData: (updatedUserData: IUserData) => void,
  loadingHome: boolean,
  homeError: boolean,
  notificationsError: boolean,
  notifications: INotifications,
  userData: IUserData,
  loadingUserData: boolean,
  // categories: ICategories,
  updatingUserData: boolean
  isAdmin: boolean,
  isCompany: boolean,
  createNewUser: (userLoginData: { name: string, email: string, password: string }) => void,
  errorCreatingNewUser: boolean,
  newUserCreated: boolean,
  loadingCreatingNewUser: boolean,
  resetUser: () => void
}

export type { IUser, INotification, IProps, IUserContext, INotifications, IUserData, ICategories, IUsers };
