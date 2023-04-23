import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UserRepository } from './user.repository';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { UserFilterDTO } from '../interfaces/user-filter.dto';
import { PaginationUtil } from '../util/pagination-util';
import { DeleteResult } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async findAll(
    pageable: PageOptionsDTO,
    filters: UserFilterDTO,
  ): Promise<PageDTO<User[]>> {
    const pagination = PaginationUtil.generatePagination(pageable);
    return await this.userRepository.findAll(pagination, filters);
  }

  async findAllEmployees(
    pageable: PageOptionsDTO,
    filters: UserFilterDTO,
  ): Promise<PageDTO<User[]>> {
    const pagination = PaginationUtil.generatePagination(pageable);
    return await this.userRepository.findAllEmployees(pagination, filters);
  }

  async findOne(id: number): Promise<User | null> {
    const user: User = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async create(user: User): Promise<void> {
    if (user.password) {
      user.password = await this.encryptPassword(user.password);
    }
    await this.userRepository.saveNew(user);
  }

  public async update(user: User, id: number, token: string): Promise<User> {
    // const userFromToken = await this.authService.getUserFromToken(token);
    // if (userFromToken.id !== id) {
    //   throw new BadRequestException('You can only update your own user');
    // }
    // if (user.passwordConfirmation) {
    //   const isPasswordConfirmed = await this.validateCredentials(
    //     userFromToken,
    //     user.passwordConfirmation,
    //   );
    //   if (!isPasswordConfirmed) {
    //     throw new BadRequestException('Password is not confirmed');
    //   }
    //   user.password = await this.encryptPassword(user.password);
    // } else {
    user.password = undefined;
    // }
    user.passwordConfirmation = undefined;
    const updateResult = await this.userRepository.update(id, user);

    if (!updateResult.affected) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async delete(id: number): Promise<DeleteResult> {
    const deleteResult = await this.userRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('User not found');
    }
    return deleteResult;
  }

  public async updateLastLogin(id: number): Promise<void> {
    await this.userRepository.updateLastlogin(id);
  }

  public async validateCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    return compare(password, user.password);
  }

  public async findByUsernameOrEmail(username: string): Promise<User | null> {
    return await this.userRepository.findByUsernameOrEmail(username);
  }

  public async findManyByIds(userIds: number[]): Promise<User[] | null> {
    return await this.userRepository.findManyByIds(userIds);
  }

  public async encryptPassword(password: any): Promise<string> {
    return await hash(password, 8);
  }
}
