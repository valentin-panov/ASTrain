export default interface IUser {
  _id?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  bio?: string;
}
