import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUsersDto } from '../users/dto/create-users.dto'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import { AuthorizationDto } from './dto/authorization.dto'
import { Token } from '../../../classes/authorization/jwt/token'
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service'

@Injectable()
export class AuthorizationService {
  private token: Token

  constructor(
    private refreshTokensService: RefreshTokensService,
    private usersService: UsersService,
  ) {
    this.token = new Token()
  }

  async login(dto: AuthorizationDto) {
    const user = await this.validateUser(dto)

    const tokens = this.token.generateTokens(user)

    await this.refreshTokensService.saveRefreshToken({
      user_id: user.id,
      token: tokens.refreshToken,
    })

    return {
      user: this.token.getPayload(user),
      ...tokens,
    }
  }

  async registration(dto: CreateUsersDto) {
    const user = await this.usersService.create(dto)
    const tokens = await this.login({email: user.email, password: user.password})
    return tokens
  }

  async logout(refreshToken: string) {
    return await this.refreshTokensService.destroy(refreshToken)
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'The user is not logged in',
        statusCode: HttpStatus.UNAUTHORIZED,
      })
    }

    const userData = await this.token.validateRefreshToken(refreshToken)

    if (!userData) {
      throw new UnauthorizedException({
        message: 'The user is not logged in',
        statusCode: HttpStatus.UNAUTHORIZED,
      })
    }

    const user = await this.usersService.findByEmail(userData.email)

    const tokens = this.token.generateTokens(user)

    return {
      user: this.token.getPayload(user),
      ...tokens,
    }
  }

  private async validateUser(dto: AuthorizationDto) {
    const user = await this.usersService.findByEmail(dto.email)
    const passwordEquals = await bcrypt.compare(dto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
      statusCode: HttpStatus.UNAUTHORIZED,
    })
  }
}
