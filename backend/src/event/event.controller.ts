import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Event } from '../models/event.model';
import { EventService } from './event.service';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) response,
    @Query() pageable: PageOptionsDTO,
  ): Promise<Event[]> {
    const page: PageDTO<Event[]> = await this.eventService.findAll(pageable);
    PaginationUtil.generatePaginationHttpHeaders(page, response);
    return page.data;
  }

  @Get('/get-workload')
  async findByUserWorkload(): Promise<any> {
    return await this.eventService.findByUserWorkload(0);
  }

  @Get('/types')
  async getTypes(): Promise<string[] | null> {
    return await this.eventService.getTypes();
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: number): Promise<Event[] | null> {
    return await this.eventService.findByUser(+id);
  }

  @Get('/:id')
  async find(@Param('id') id: number): Promise<Event | null> {
    return await this.eventService.findOne(+id);
  }

  @Post('/')
  async create(@Body() event: Event): Promise<void> {
    await this.eventService.create(event);
  }

  @Put('/:id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() event: Event,
  ): Promise<Event | null> {
    return this.eventService.update(event, +id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.eventService.delete(id);
  }
}
