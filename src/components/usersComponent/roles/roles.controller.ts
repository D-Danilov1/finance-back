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
import { RolesService } from './roles.service'
import { Roles } from './models/roles.model'
import { ValidationPipe } from '../../../pipes/validation.pipe'
import { CreateRolesDto } from './dto/create-roles.dto'
import { UpdateRolesDto } from './dto/update-roles.dto'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'

@Controller('/api/roles')
export class RolesController {
  constructor(private service: RolesService) {}

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Post()
  async create(
    @Body() dto: CreateRolesDto,
  ): Promise<{ response: Roles; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get()
  async findAll(): Promise<{ response: Roles[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/:id')
  async findByPk(@Param('id') id: number): Promise<{ response: Roles; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<{ response: Roles; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByName(name),
    }
  }

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Put()
  async update(@Body() dto: UpdateRolesDto): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Delete('/:id')
  async destroy(@Param('id') id: number): Promise<{ response: number; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.destroy(id),
    }
  }
}
