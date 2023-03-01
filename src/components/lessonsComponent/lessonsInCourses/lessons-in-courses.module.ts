import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { LessonsInCoursesController } from './lessons-in-courses.controller'
import { LessonsInCoursesService } from './lessons-in-courses.service'
import { LessonsInCourses } from './models/lessons-in-courses.model'

@Module({
  providers: [LessonsInCoursesService],
  controllers: [LessonsInCoursesController],
  imports: [SequelizeModule.forFeature([LessonsInCourses])],
  exports: [SequelizeModule, LessonsInCoursesService],
})
export class LessonsInCoursesModule {}
