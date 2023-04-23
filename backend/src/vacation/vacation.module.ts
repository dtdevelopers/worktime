import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationRepository } from './vacation.repository';
import { VacationService } from './vacation.service';
import { Vacation } from 'src/models/vacation.model';
import { VacationController } from './vacation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation])],
  providers: [VacationService, VacationRepository],
  exports: [VacationService],
  controllers: [VacationController],
})
export class VacationModule {}
