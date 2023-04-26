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
import { Exception } from '../models/exception.model';
import { ExceptionService } from './exception.service';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';

@Controller('exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) response,
    @Query() pageable: PageOptionsDTO,
  ): Promise<Exception[]> {
    const page: PageDTO<Exception[]> = await this.exceptionService.findAll(
      pageable,
    );
    PaginationUtil.generatePaginationHttpHeaders(page, response);
    return page.data;
  }

  @Get('/duration-types')
  async getDurationTypes(): Promise<string[] | null> {
    return await this.exceptionService.getDurationTypes();
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: number): Promise<Exception[] | null> {
    return await this.exceptionService.findByUser(+id);
  }

  @Get('/:id')
  async find(@Param('id') id: number): Promise<Exception | null> {
    return await this.exceptionService.findOne(+id);
  }

  @Post('/')
  async create(@Body() exception: Exception): Promise<void> {
    await this.exceptionService.create(exception);
  }

  @Put('/:id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() exception: Exception,
  ): Promise<Exception | null> {
    return this.exceptionService.update(exception, +id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.exceptionService.delete(id);
  }
}
