import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { LessonScheduleController } from './lesson-schedule.controller'
import { LessonScheduleService } from './lesson-schedule.service'
import { LessonSchedule } from './models/lesson-schedule.model'

@Module({
  providers: [LessonScheduleService],
  controllers: [LessonScheduleController],
  imports: [SequelizeModule.forFeature([LessonSchedule])],
  exports: [SequelizeModule, LessonScheduleService],
})
export class LessonScheduleModule {}
