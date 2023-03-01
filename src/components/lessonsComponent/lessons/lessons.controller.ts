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
import { LessonsService } from './lessons.service'
import { Lessons } from './models/lessons.model'
import { ValidationPipe } from '../../../pipes/validation.pipe'
import { CreateLessonsDto } from './dto/create-lessons.dto'
import { UpdateLessonsDto } from './dto/update-lessons.dto'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'

@Controller('/api/lessons')
export class LessonsController {
  constructor(private service: LessonsService) {}

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateLessonsDto,
  ): Promise<{ response: Lessons; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: Lessons[]
    statusCode: number
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/:id')
  async findByPk(@Param('id') id: number): Promise<{ response: Lessons; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    }
  }

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(@Body() dto: UpdateLessonsDto): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<{ response: Lessons; statusCode: number }> {
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
