import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Days } from './models/days.model'
import { EntityService } from '../../../classes/core/entity.service'
import { findByName } from '../../../traits/find-by.trait'

@Injectable()
export class DaysService extends EntityService<Days> {
  constructor(
    @InjectModel(Days)
    protected repository: typeof Days,
  ) {
    super(repository)
  }

  findByName = findByName
}
