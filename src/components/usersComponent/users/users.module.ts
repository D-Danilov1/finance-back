import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Users } from './models/users.model'
import { RolesModule } from '../roles/roles.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([Users]), RolesModule],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
