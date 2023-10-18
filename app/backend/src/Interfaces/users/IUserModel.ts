import { IUser } from './IUsers';

export interface IUserModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
