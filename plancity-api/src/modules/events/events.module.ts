import { CommonModule } from './../common/common.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { CategoriesModule } from '../categories/categories.module';
import { EventImage } from './entities/event-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventImage]),
    CategoriesModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
