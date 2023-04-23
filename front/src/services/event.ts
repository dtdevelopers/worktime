import api from './api';
import { ErrorResponse } from '../types/error';
import { queryClient } from '../routes';
import { IEvent } from '../types/event';

export class EventService {

  static async find(id: number): Promise<IEvent | undefined> {
    const { data, ok } = await api
        .get<IEvent | ErrorResponse>(`event/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IEvent;
  }

  static async findAll(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>('event');
    return data as IEvent[];
  }

  static async create(event: IEvent): Promise<IEvent | undefined> {
    const { data, ok } = await api
        .post<IEvent | ErrorResponse>('event', {
      ...event,
    });
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    return data as IEvent;
  }

  static async update(event: Partial<IEvent>): Promise<IEvent | undefined> {
    const { data, ok } = await api.put<IEvent | ErrorResponse>(`event/${event.id}`, event);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
    await queryClient.invalidateQueries(`event-${event.id}`);
    return data as IEvent;
  }

  static async delete(id: number): Promise<void> {
    const { data, ok } = await api.delete(`event/${id}`);
    if (!ok) {
      throw new Error((data as ErrorResponse).message);
    }
  }
}
