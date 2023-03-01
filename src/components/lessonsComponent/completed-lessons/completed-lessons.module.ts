import { Module } from '@nestjs/common'
import { CompletedLessonsService } from './completed-lessons.service'
import { CompletedLessonsController } from './completed-lessons.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { CompletedLessons } from './models/completed-lessons.model'

@Module({
  providers: [CompletedLessonsService],
  controllers: [CompletedLessonsController],
  imports: [SequelizeModule.forFeature([CompletedLessons])],
  exports: [SequelizeModule, CompletedLessonsService],
})
export class CompletedLessonsModule {}
