import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Courses } from './models/courses.model'
import { EntityService } from '../../../classes/core/entity.service'
import { findByName } from '../../../traits/find-by.trait'

@Injectable()
export class CoursesService extends EntityService<Courses> {
  constructor(
    @InjectModel(Courses)
    protected repository: typeof Courses,
  ) {
    super(repository)
  }

  findByName = findByName
}
