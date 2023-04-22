import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../models/user.model';
import { Injectable } from '@nestjs/common';
import { PageDTO } from '../interfaces/page.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async findAll(pagination, filters): Promise<PageDTO<User[]> | null> {
    const query = this.createQueryBuilder('user');
    if ('username' in filters) {
      query.andWhere(`UPPER(username) LIKE UPPER('%${filters.username}%')`);
    }
    if ('email' in filters) {
      query.andWhere(`UPPER(email) LIKE UPPER('%${filters.email}%')`);
    }
    if ('query' in filters) {
      query.andWhere(
        `UPPER(email) LIKE UPPER('%${filters.query}%') OR UPPER(username) LIKE UPPER('%${filters.query}%')`,
      );
    }

    const [data, total] = await query
      .orderBy('user.username', 'ASC')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
    return { data, total };
  }

  public async findById(id: number): Promise<User | null> {
    const query = this.createQueryBuilder('user').where('user.id = :id', {
      id,
    });
    return await query.getOne();
  }

  public async saveNew(user: User): Promise<User> {
    const insertedUser: InsertResult = await this.insert(user);
    return insertedUser.raw[0];
  }

  public async update(id: number, user: User): Promise<UpdateResult> {
    return await this.createQueryBuilder()
      .update(User)
      .set(user)
      .where('id = :id', { id })
      .execute();
  }

  public async updateLastlogin(id: number): Promise<void> {
    await this.save({
      id,
      lastLogin: new Date(),
    });
  }

  public async findByUsernameOrEmail(username: string): Promise<User | null> {
    const user: User | undefined = await this.createQueryBuilder('user')
      .where('(user.email = :username)', {
        username,
      })
      .orWhere('(user.document = :username)', {
        username,
      })
      .getOne();
    if (!user) {
      return null;
    }
    return user;
  }

  public async findManyByIds(userIds: number[]): Promise<User[] | null> {
    const users: User[] | undefined = await this.createQueryBuilder('user')
      .whereInIds(userIds)
      .getMany();
    return users;
  }

  public async findOneLogin(username: string): Promise<User | null> {
    const user: User | undefined = await this.createQueryBuilder('user')
      .where('(user.email = :username)', {
        username,
      })
      .getOne();
    if (!user) {
      return null;
    }
    return user;
  }
}
