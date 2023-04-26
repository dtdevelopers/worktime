import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Exception } from '../models/exception.model';
import { Injectable } from '@nestjs/common';
import { PageDTO } from '../interfaces/page.dto';
import { Event } from '../models/event.model';

@Injectable()
export class ExceptionRepository extends Repository<Exception> {
  constructor(private dataSource: DataSource) {
    super(Exception, dataSource.createEntityManager());
  }

  public async findAll(pagination): Promise<PageDTO<Exception[]> | null> {
    const query = this.createQueryBuilder('exception');
    query.leftJoinAndSelect('exception.user', 'user');
    // todo filter by user
    // query.andWhere('exception.is_employee = :isEmployee', { isEmployee: true });

    const [data, total] = await query
      .orderBy('exception.occurrenceDate', 'ASC')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
    return { data, total };
  }

  public async findByUser(id: number): Promise<Exception[] | null> {
    const query = this.createQueryBuilder('exception').where(
      'exception.user_id = :id',
      {
        id,
      },
    );
    return await query.getMany();
  }

  public async findById(id: number): Promise<Exception | null> {
    const query = this.createQueryBuilder('exception').where(
      'exception.id = :id',
      {
        id,
      },
    );
    return await query.getOne();
  }

  public async saveNew(exception: Exception): Promise<Exception> {
    const insertedException: InsertResult = await this.insert(exception);
    return insertedException.raw[0];
  }

  public async update(id: number, exception: Exception): Promise<UpdateResult> {
    return await this.createQueryBuilder()
      .update(Exception)
      .set(exception)
      .where('id = :id', { id })
      .execute();
  }
}
