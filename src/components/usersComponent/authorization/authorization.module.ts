import { Module } from '@nestjs/common'
import { AuthorizationService } from './authorization.service'
import { AuthorizationController } from './authorization.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { RefreshTokens } from '../refresh-tokens/models/refresh-tokens.model'
import { Users } from '../users/models/users.model'
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module'
import { UsersModule } from '../users/users.module'

@Module({
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  imports: [SequelizeModule.forFeature([RefreshTokens, Users]), RefreshTokensModule, UsersModule],
  exports: [SequelizeModule, AuthorizationService],
})
export class AuthorizationModule {}
