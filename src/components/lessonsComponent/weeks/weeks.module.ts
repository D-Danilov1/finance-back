import { Module } from '@nestjs/common'
import { WeeksService } from './weeks.service'
import { WeeksController } from './weeks.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Weeks } from './models/weeks.model'

@Module({
  providers: [WeeksService],
  controllers: [WeeksController],
  imports: [SequelizeModule.forFeature([Weeks])],
  exports: [SequelizeModule, WeeksService],
})
export class WeeksModule {}
