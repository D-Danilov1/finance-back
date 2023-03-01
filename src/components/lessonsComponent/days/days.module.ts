import { Module } from '@nestjs/common'
import { DaysService } from './days.service'
import { DaysController } from './days.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Days } from './models/days.model'

@Module({
  providers: [DaysService],
  controllers: [DaysController],
  imports: [SequelizeModule.forFeature([Days])],
  exports: [SequelizeModule, DaysService],
})
export class DaysModule {}
