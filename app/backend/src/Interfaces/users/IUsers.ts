export interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  username: string;
}

export interface ILogin {
  email:string,
  password:string,
}

export type ILoginResponse = Omit<IUser, 'id'>;
