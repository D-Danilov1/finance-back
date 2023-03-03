import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CompletedLessonsService } from './completed-lessons.service';
import { CompletedLessons } from './models/completed-lessons.model';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateCompletedLessonsDto } from './dto/create-completed-lessons.dto';
import { UpdateCompletedLessonsDto } from './dto/update-completed-lessons.dto';
import { ROLES } from '../../../constants/roles.constants';
import { RolesGuards } from '../../../decorators/roles-guards.decorator';

@Controller('/api/completed-lessons')
export class CompletedLessonsController {
  constructor(private service: CompletedLessonsService) {}

  // @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateCompletedLessonsDto,
  ): Promise<{ response: CompletedLessons; statusCode: HttpStatus.CREATED }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    };
  }

  // @RolesGuards([ROLES.USER])
  @Get()
  async findAll(): Promise<{
    response: CompletedLessons[];
    statusCode: number;
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    };
  }

  // @RolesGuards([ROLES.USER])
  @Get('/schedule/:id')
  async findBySchedule(
    @Param('id') id: number,
  ): Promise<{ response: CompletedLessons; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByScheduleId(id),
    };
  }

  // @RolesGuards([ROLES.USER])
  @Post('/all-schedule')
  async findAllBySchedule(
    @Param('id') id: string,
  ): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAllBySchedule(id),
    };
  }

  // @RolesGuards([ROLES.USER])
  @Get('/:id')
  async findByPk(
    @Param('id') id: number,
  ): Promise<{ response: CompletedLessons; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    };
  }

  // @RolesGuards([ROLES.USER])
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateCompletedLessonsDto,
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
