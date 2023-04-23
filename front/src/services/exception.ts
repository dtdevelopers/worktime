import api from './api';
import { ErrorResponse } from '../types/error';
import { queryClient } from '../routes';
import { IException } from '../types/exception';

export class ExceptionService {
  static async find(id: number): Promise<IException | undefined> {
    const { data, ok } = await api
        .get<IException | ErrorResponse>(`exception/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IException;
  }

  static async findAll(): Promise<IException[]> {
    const { data } = await api.get<IException[]>('exception');
    return data as IException[];
  }

  static async create(exception: IException): Promise<IException | undefined> {
    const { data, ok } = await api
        .post<IException | ErrorResponse>('exception', {
      ...exception,
    });
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IException;
  }

  static async update(exception: Partial<IException>): Promise<IException | undefined> {
    const { data, ok } = await api.put<IException | ErrorResponse>(`exception/${exception.id}`, exception);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    await queryClient.invalidateQueries(`exception-${exception.id}`);
    return data as IException;
  }

  static async delete(id: number): Promise<void> {
    const { data, ok } = await api.delete(`exception/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
  }
}
