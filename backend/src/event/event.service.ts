import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from 'src/models/event.model';
import { EventRepository } from './event.repository';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';
import { DeleteResult } from 'typeorm';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAll(pageable: PageOptionsDTO): Promise<PageDTO<Event[]>> {
    const pagination = PaginationUtil.generatePagination(pageable);
    return await this.eventRepository.findAll(pagination);
  }

  async findByUser(id: number): Promise<Event[] | null> {
    return await this.eventRepository.findByUser(id);
  }

  async findOne(id: number): Promise<Event | null> {
    const event: Event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async getTypes(): Promise<string[] | null> {
    return ['IN', 'OUT'];
  }

  public async create(event: Event): Promise<void> {
    await this.eventRepository.saveNew(event);
  }

  public async update(event: Event, id: number): Promise<Event> {
    const updateResult = await this.eventRepository.update(id, event);

    if (!updateResult.affected) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  public async delete(id: number): Promise<DeleteResult> {
    const deleteResult = await this.eventRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException('Event not found');
    }
    return deleteResult;
  }
}
