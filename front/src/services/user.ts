import api from './api';
import { ErrorResponse } from '../types/error';
import { queryClient } from '../routes';
import { IUser } from '../types/user';

export class UserService {
  static async find(id: number): Promise<IUser | undefined> {
    const { data, ok } = await api.get<IUser | ErrorResponse>(`user/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IUser;
  }

  // static async _findAll({query}: {query: string}): Promise<IUser[]> {
  //   const { data } = await api.get<IUser[]>('user', {query});
  //   return data || [];
  // }

  static async findAll(): Promise<IUser[] | unknown> {
    return new Promise((resolve) => {
      resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@travolta.com',
          document: '123456789',
          phone: '123456789',
        }
      ] as IUser[]);
    });
  }

  static async create(user: IUser): Promise<IUser | undefined> {
    const { data, ok } = await api.post<IUser | ErrorResponse>('user', {
      ...user,
    });
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IUser;
  }

  static async register(user: IUser): Promise<IUser | undefined> {
    const { data, ok } = await api.post<IUser | ErrorResponse>('register', {
      ...user,
    });
    // if (!ok) {
    //   throw new Error((data as ErrorResponse).message);
    // }
    return data as IUser;
  }

  static async update(user: Partial<IUser>): Promise<IUser | undefined> {
    const { data, ok } = await api.put<IUser | ErrorResponse>(`user/${user.id}`, user);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    await queryClient.invalidateQueries(`user-${user.id}`);
    return data as IUser;
  }

  static async delete(id: number): Promise<void> {
    const { data, ok } = await api.delete(`user/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
  }
}
