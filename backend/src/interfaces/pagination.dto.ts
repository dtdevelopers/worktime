import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDTO {
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page: number = 0;

  @Type(() => Number)
  @IsInt()
  @Max(50)
  @IsOptional()
  readonly size: number = 10;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly q?: string;
}
