import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { Event } from 'src/models/event.model';
import { EventController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventService, EventRepository],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
