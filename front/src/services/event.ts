import api from './api';
import { ErrorResponse } from '../types/error';
import { queryClient } from '../routes';
import { IVacation } from '../types/vacation';

export class VacationService {

  static async find(id: number): Promise<IVacation | undefined> {
    const { data, ok } = await api
        .get<IVacation | ErrorResponse>(`vacation/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IVacation;
  }

  static async findAll(): Promise<IVacation[] | unknown> {
    const { data } = await api.get<IVacation[]>('vacation');
    return data || [];
  }

  static async create(vacation: IVacation): Promise<IVacation | undefined> {
    const { data, ok } = await api
        .post<IVacation | ErrorResponse>('vacation', {
      ...vacation,
    });
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IVacation;
  }

  static async update(vacation: Partial<IVacation>): Promise<IVacation | undefined> {
    const { data, ok } = await api.put<IVacation | ErrorResponse>(`vacation/${vacation.id}`, vacation);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    await queryClient.invalidateQueries(`vacation-${vacation.id}`);
    return data as IVacation;
  }

  static async delete(id: number): Promise<void> {
    const { data, ok } = await api.delete(`vacation/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
  }
}
