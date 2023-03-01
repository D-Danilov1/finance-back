import { Module } from '@nestjs/common'
import { LessonsService } from './lessons.service'
import { LessonsController } from './lessons.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Lessons } from './models/lessons.model'

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [SequelizeModule.forFeature([Lessons])],
  exports: [SequelizeModule, LessonsService],
})
export class LessonsModule {}
