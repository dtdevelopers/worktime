import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Event } from '../models/event.model';
import { Injectable } from '@nestjs/common';
import { PageDTO } from '../interfaces/page.dto';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(private dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }

  public async findAll(pagination): Promise<PageDTO<Event[]> | null> {
    const query = this.createQueryBuilder('event');
    query.leftJoinAndSelect('event.user', 'user');
    // todo filter by user
    // query.andWhere('event.is_employee = :isEmployee', { isEmployee: true });

    const [data, total] = await query
      .orderBy('event.createdDate', 'ASC')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
    return { data, total };
  }

  public async findById(id: number): Promise<Event | null> {
    const query = this.createQueryBuilder('event').where('event.id = :id', {
      id,
    });
    return await query.getOne();
  }

  public async saveNew(event: Event): Promise<Event> {
    const insertedEvent: InsertResult = await this.insert(event);
    return insertedEvent.raw[0];
  }

  public async update(id: number, event: Event): Promise<UpdateResult> {
    return await this.createQueryBuilder()
      .update(Event)
      .set(event)
      .where('id = :id', { id })
      .execute();
  }
}
