import { Injectable, NotFoundException } from '@nestjs/common';
import { Vacation } from 'src/models/vacation.model';
import { VacationRepository } from './vacation.repository';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';
import { DeleteResult } from 'typeorm';

@Injectable()
export class VacationService {
  constructor(private readonly vacationRepository: VacationRepository) {}

  async findAll(pageable: PageOptionsDTO): Promise<PageDTO<Vacation[]>> {
    const pagination = PaginationUtil.generatePagination(pageable);
    return await this.vacationRepository.findAll(pagination);
  }

  async findOne(id: number): Promise<Vacation | null> {
    const vacation: Vacation = await this.vacationRepository.findById(id);
    if (!vacation) {
      throw new NotFoundException('Vacation not found');
    }
    return vacation;
  }

  public async create(vacation: Vacation): Promise<void> {
    await this.vacationRepository.saveNew(vacation);
  }

  public async update(vacation: Vacation, id: number): Promise<Vacation> {
    const updateResult = await this.vacationRepository.update(id, vacation);

    if (!updateResult.affected) {
      throw new NotFoundException('Vacation not found');
    }
    return vacation;
  }

  public async delete(id: number): Promise<DeleteResult> {
    const deleteResult = await this.vacationRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('Vacation not found');
    }
    return deleteResult;
  }
}
