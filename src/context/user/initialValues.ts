const initialValues = {
  user: {
    userId: '',
    userEmail: '',
    clientType: [''],
  },
  setUser: () => { },
  loadUser: () => { },
  loadUserData: () => { },
  updateUserData: () => { },
  listCategories: () => { },
  createNewUser: () => { },
  resetUser: () => { },
  categories: [{ _id: '', name: '' }],
  loadingHome: false,
  homeError: false,
  notificationsError: false,
  notifications: [{
    notificationId: '',
    text: '',
    type: '',
    userType: []
  }],
  setNotifications: () => { },
  userData: {
    name: '',
    address: {
      street: '',
      number: '',
      city: ''
    },
    isAdmin: false,
    isCompany: false,
    userDescription: '',
    userTechnologies: [],
    cnpj: '00000000000000',
    email: '',
    userId: ''
  },
  loadingUserData: true,
  updatingUserData: false,
  isAdmin: false,
  isCompany: false,
  errorCreatingNewUser: false,
  newUserCreated: false,
  loadingCreatingNewUser: false
};

export default initialValues;
