import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageDTO<T> {
  data: T;

  @Type(() => Number)
  @IsInt()
  total: number;
}
