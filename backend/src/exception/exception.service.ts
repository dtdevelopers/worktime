import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Exception } from 'src/models/exception.model';
import { ExceptionRepository } from './exception.repository';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';
import { DeleteResult } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ExceptionService {
  constructor(private readonly exceptionRepository: ExceptionRepository) {}

  async findAll(pageable: PageOptionsDTO): Promise<PageDTO<Exception[]>> {
    const pagination = PaginationUtil.generatePagination(pageable);
    return await this.exceptionRepository.findAll(pagination);
  }

  async findOne(id: number): Promise<Exception | null> {
    const exception: Exception = await this.exceptionRepository.findById(id);
    if (!exception) {
      throw new NotFoundException('Exception not found');
    }
    return exception;
  }

  public async create(exception: Exception): Promise<void> {
    await this.exceptionRepository.saveNew(exception);
  }

  public async update(exception: Exception, id: number): Promise<Exception> {
    const updateResult = await this.exceptionRepository.update(id, exception);

    if (!updateResult.affected) {
      throw new NotFoundException('Exception not found');
    }
    return exception;
  }

  public async delete(id: number): Promise<DeleteResult> {
    const deleteResult = await this.exceptionRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('Exception not found');
    }
    return deleteResult;
  }
}
