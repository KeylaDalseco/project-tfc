import SequelizeUser from '../database/models/SequelizeUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { IUser } from '../Interfaces/users/IUsers';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }
}
