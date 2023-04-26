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
import { Vacation } from '../models/vacation.model';
import { VacationService } from './vacation.service';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';

@Controller('vacation')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) response,
    @Query() pageable: PageOptionsDTO,
  ): Promise<Vacation[]> {
    const page: PageDTO<Vacation[]> = await this.vacationService.findAll(
      pageable,
    );
    PaginationUtil.generatePaginationHttpHeaders(page, response);
    return page.data;
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: number): Promise<Vacation[] | null> {
    return await this.vacationService.findByUser(+id);
  }

  @Get('/:id')
  async find(@Param('id') id: number): Promise<Vacation | null> {
    return await this.vacationService.findOne(+id);
  }

  @Post('/')
  async create(@Body() vacation: Vacation): Promise<void> {
    await this.vacationService.create(vacation);
  }

  @Put('/:id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() vacation: Vacation,
  ): Promise<Vacation | null> {
    return this.vacationService.update(vacation, +id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.vacationService.delete(id);
  }
}
