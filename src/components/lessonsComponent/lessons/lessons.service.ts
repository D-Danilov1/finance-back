import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Lessons } from './models/lessons.model'
import { EntityService } from '../../../classes/core/entity.service'
import { findByName } from '../../../traits/find-by.trait'

@Injectable()
export class LessonsService extends EntityService<Lessons> {
  constructor(
    @InjectModel(Lessons)
    protected repository: typeof Lessons,
  ) {
    super(repository)
  }

  findByName = findByName
}
