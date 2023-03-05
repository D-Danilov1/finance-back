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
} from '@nestjs/common';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { ROLES } from '../../../constants/roles.constants';
import { RolesGuards } from '../../../decorators/roles-guards.decorator';
import { CreateLessonScheduleDto } from './dto/create-lesson-schedule.dto';
import { LessonSchedule } from './models/lesson-schedule.model';
import { LessonScheduleService } from './lesson-schedule.service';
import { UpdateLessonScheduleDto } from './dto/update-lesson-schedule.dto';

@Controller('/api/lesson-schedule')
export class LessonScheduleController {
  constructor(private service: LessonScheduleService) {}

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateLessonScheduleDto,
  ): Promise<{ response: LessonSchedule; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    };
  }

  @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: LessonSchedule[];
    statusCode: number;
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    };
  }

  @RolesGuards([ROLES.USER])
  @Get('/:id')
  async findByPk(
    @Param('id') id: number,
  ): Promise<{ response: LessonSchedule; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    };
  }

  @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateLessonScheduleDto,
  ): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    };
  }

  @RolesGuards([ROLES.ADMIN])
  @Delete('/:id')
  async destroy(
    @Param('id') id: number,
  ): Promise<{ response: number; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.destroy(id),
    };
  }
}
