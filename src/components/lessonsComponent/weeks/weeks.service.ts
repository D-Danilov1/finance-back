import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Weeks } from './models/weeks.model'
import { EntityService } from '../../../classes/core/entity.service'
import { findByName } from '../../../traits/find-by.trait'

@Injectable()
export class WeeksService extends EntityService<Weeks> {
  constructor(
    @InjectModel(Weeks)
    protected repository: typeof Weeks,
  ) {
    super(repository)
  }

  findByName = findByName
}
