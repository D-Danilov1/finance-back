import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Token } from '../../../../classes/authorization/jwt/token'
import { ROLES_KEY } from '../../../../decorators/roles-guards.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  private token: Token

  constructor(private reflector: Reflector) {
    // TODO: вынести в конструктор
    this.token = new Token()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])

      if (!requireRoles) {
        return true
      }

      const request = context.switchToHttp().getRequest()

      const user = this.checkAuthorizationAndReturnUser(request)
      request.user = user

      return user.roles.some((role) => requireRoles.includes(role))
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }

  checkAuthorizationAndReturnUser(request) {
    const authorizationHeader = request.headers.authorization
    const bearer = authorizationHeader.split(' ')[0]
    const accessToken = authorizationHeader.split(' ')[1]

    if (bearer !== 'Bearer' || !accessToken) {
      throw new UnauthorizedException({
        message: 'The user is not logged in',
      })
    }

    return this.token.validateAccessToken(accessToken)
  }
}
