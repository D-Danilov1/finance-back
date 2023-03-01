import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Roles } from './models/roles.model'
import { UsersRoles } from '../many-to-many/users-roles.model'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Roles, UsersRoles])],
  exports: [SequelizeModule, RolesService],
})
export class RolesModule {}
