import { Module } from '@nestjs/common'
import { CoursesService } from './courses.service'
import { CoursesController } from './courses.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Courses } from './models/courses.model'

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
  imports: [SequelizeModule.forFeature([Courses])],
  exports: [SequelizeModule, CoursesService],
})
export class CoursesModule {}
