import api from './api';
import { ErrorResponse } from '../types/error';
import { IUser } from '../types/user';

export interface IToken {
  token: string;
  expires: Date;
}

export type AuthenticateResponse = {
  user: IUser;
  refresh_token: string;
  token: string;
};

type Credentials = {
  username: string;
  password: string;
};

export class AuthService {
  static async authenticate(credentials: Credentials): Promise<AuthenticateResponse | undefined> {
    const { data, ok } = await api.post<AuthenticateResponse | ErrorResponse>(
      'authenticate',
      credentials,
    );
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as AuthenticateResponse;
  }
}
