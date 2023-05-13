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
    query.leftJoinAndSelect('event.user', 'user', 'user.id = event.user_id');
    // todo filter by user
    // query.andWhere('event.is_employee = :isEmployee', { isEmployee: true });

    const [data, total] = await query
      .orderBy('event.createdDate', 'ASC')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
    return { data, total };
  }

  public async findByUserWorkload(id: number): Promise<any> {
    return [
      {
        userId: 2,
        workload: 160,
        worked: 150,
        monthlyBalance: 10,
        days: [
          {
            date: '2021-01-01',
            balance: 0,
            events: [
              {
                id: 1,
                type: 'in',
                date: '2021-01-01 08:00:00',
              },
              {
                id: 2,
                type: 'out',
                date: '2021-01-01 08:00:00',
              },
            ],
          },
          {
            date: '2021-01-02',
            balance: -2,
            events: [
              {
                id: 1,
                type: 'in',
                date: '2021-01-01 08:00:00',
              },
              {
                id: 2,
                type: 'out',
                date: '2021-01-01 08:00:00',
              },
            ],
          },
        ],
      },
    ];
  }

  public async findByUser(id: number): Promise<Event[] | null> {
    const query = this.createQueryBuilder('event').where(
      'event.user_id = :id',
      {
        id,
      },
    );
    return await query.getMany();
  }

  public async findById(id: number): Promise<Event | null> {
    const query = this.createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user', 'user.id = event.user_id')
      .where('event.id = :id', {
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
