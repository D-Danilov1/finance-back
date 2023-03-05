import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUsersDto } from './dto/create-users.dto'
import { Users } from './models/users.model'
import { RoleToUserDto } from './dto/role-to-user.dto'
import { UpdateUsersDto } from './dto/update-users.dto'
import { ValidationPipe } from '../../../pipes/validation.pipe'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'

@Controller('/api/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateUsersDto): Promise<{ response: Users; statusCode: number }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get()
  async findAll(): Promise<{ response: Users[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/:id')
  async findByPk(@Param('id') id: string): Promise<{ response: Users; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<{ response: Users; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByEmail(email),
    }
  }

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Put()
  async update(@Body() dto: UpdateUsersDto): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    }
  }

  // @RolesGuards([ROLES.ADMIN])
  // @Delete('/:id')
  // async destroy(@Param('id') id: string): Promise<{ response: number; statusCode: number }> {
  //   return {
  //     statusCode: HttpStatus.OK,
  //     response: await this.service.destroy(id),
  //   }
  // }

  // @RolesGuards([ROLES.ADMIN])
  @Delete('/destroy')
  async destroyUsers() {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.destroyUsers(),
    }
  }


  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Put('/add/role')
  async addRoleToUser(
    @Body() dto: RoleToUserDto,
  ): Promise<{ response: unknown; statusCode: HttpStatus }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.addRoleToUser(dto),
    }
  }

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Delete('/remove/role')
  async removeRoleToUser(
    @Body() dto: RoleToUserDto,
  ): Promise<{ response: number; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.removeRoleToUser(dto),
    }
  }
}
