
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

export type { IUser, INotification };
