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
import { DaysService } from './days.service'
import { Days } from './models/days.model'
import { ValidationPipe } from '../../../pipes/validation.pipe'
import { CreateDaysDto } from './dto/create-days.dto'
import { UpdateDaysDto } from './dto/update-days.dto'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'

@Controller('/api/days')
export class DaysController {
  constructor(private service: DaysService) {}

  @RolesGuards([ROLES.ADMIN])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateDaysDto,
  ): Promise<{ response: Days; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: Days[]
    statusCode: number
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/:id')
  async findByPk(@Param('id') id: number): Promise<{ response: Days; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    }
  }

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(@Body() dto: UpdateDaysDto): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<{ response: Days; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByName(name),
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
