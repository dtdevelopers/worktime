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
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { PageOptionsDTO } from '../interfaces/pagination.dto';
import { PageDTO } from '../interfaces/page.dto';
import { PaginationUtil } from '../util/pagination-util';
import { UserFilterDTO } from '../interfaces/user-filter.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Res({ passthrough: true }) response,
    @Query() pageable: PageOptionsDTO,
    @Query() filters: UserFilterDTO,
  ): Promise<User[]> {
    const page: PageDTO<User[]> = await this.userService.findAll(
      pageable,
      filters,
    );
    PaginationUtil.generatePaginationHttpHeaders(page, response);
    return page.data;
  }

  @Get('/:id')
  async find(@Param('id') id: number): Promise<User | null> {
    return await this.userService.findOne(+id);
  }

  @Post('/')
  async create(@Body() user: User): Promise<void> {
    await this.userService.create(user);
  }

  @Put('/:id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() user: User,
  ): Promise<User | null> {
    return this.userService.update(user, +id, req.headers.authorization);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
