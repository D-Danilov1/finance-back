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
import { ValidationPipe } from '../../../pipes/validation.pipe'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'
import { CreateLessonsInCoursesDto } from './dto/create-lessons-in-courses.dto'
import { LessonsInCourses } from './models/lessons-in-courses.model'
import { LessonsInCoursesService } from './lessons-in-courses.service'
import { UpdateLessonsInCoursesDto } from './dto/update-lessons-in-courses.dto'

@Controller('/api/lessons-in-courses')
export class LessonsInCoursesController {
  constructor(private service: LessonsInCoursesService) {}

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateLessonsInCoursesDto,
  ): Promise<{ response: LessonsInCourses; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: LessonsInCourses[]
    statusCode: number
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/course/:id')
  async findByClientId(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByCourseId(id),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/course-sorted/:id')
  async getSortedCourse(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.getSortedCourse(id),
    }
  }

  @RolesGuards([ROLES.USER])
  @Get('/:id')
  async findByPk(
    @Param('id') id: number,
  ): Promise<{ response: LessonsInCourses; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    }
  }

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateLessonsInCoursesDto,
  ): Promise<{ response: number[]; statusCode: number }> {
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
