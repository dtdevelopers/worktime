import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionRepository } from './exception.repository';
import { ExceptionService } from './exception.service';
import { Exception } from 'src/models/exception.model';
import { ExceptionController } from './exception.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exception])],
  providers: [ExceptionService, ExceptionRepository],
  exports: [ExceptionService],
  controllers: [ExceptionController],
})
export class ExceptionModule {}
