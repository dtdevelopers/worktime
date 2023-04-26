import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Vacation } from '../models/vacation.model';
import { Injectable } from '@nestjs/common';
import { PageDTO } from '../interfaces/page.dto';

@Injectable()
export class VacationRepository extends Repository<Vacation> {
  constructor(private dataSource: DataSource) {
    super(Vacation, dataSource.createEntityManager());
  }

  public async findAll(pagination): Promise<PageDTO<Vacation[]> | null> {
    const query = this.createQueryBuilder('vacation');
    query.leftJoinAndSelect('vacation.user', 'user');
    // todo filter by user
    // query.andWhere('vacation.is_employee = :isEmployee', { isEmployee: true });

    const [data, total] = await query
      .orderBy('vacation.startDate', 'ASC')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
    return { data, total };
  }

  public async findByUser(id: number): Promise<Vacation[] | null> {
    const query = this.createQueryBuilder('vacation').where(
      'vacation.user_id = :id',
      {
        id,
      },
    );
    return await query.getMany();
  }

  public async findById(id: number): Promise<Vacation | null> {
    const query = this.createQueryBuilder('vacation').where(
      'vacation.id = :id',
      {
        id,
      },
    );
    return await query.getOne();
  }

  public async saveNew(vacation: Vacation): Promise<Vacation> {
    const insertedVacation: InsertResult = await this.insert(vacation);
    return insertedVacation.raw[0];
  }

  public async update(id: number, vacation: Vacation): Promise<UpdateResult> {
    return await this.createQueryBuilder()
      .update(Vacation)
      .set(vacation)
      .where('id = :id', { id })
      .execute();
  }
}
