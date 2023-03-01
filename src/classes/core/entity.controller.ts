import { Body, Delete, Get, HttpStatus, Param, Post, Put, UsePipes } from '@nestjs/common'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { ROLES } from '../../constants/roles.constants'
import { EntityService } from './entity.service'
import { RolesGuards } from '../../decorators/roles-guards.decorator'

// TODO: внедрить
export abstract class EntityController<M, CMD, UMD> {
  protected constructor(private service: EntityService<M>) {}

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Post()
  async create(@Body() dto: CMD): Promise<{ response: M; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get()
  async findAll(): Promise<{ response: M[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    }
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/:id')
  async findByPk(@Param('id') id: number): Promise<{ response: M; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    }
  }

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Put()
  async update(@Body() dto: UMD): Promise<{ response: number[]; statusCode: number }> {
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
