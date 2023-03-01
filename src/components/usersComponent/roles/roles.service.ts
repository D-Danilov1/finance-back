import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Roles } from './models/roles.model'
import { EntityService } from '../../../classes/core/entity.service'
import { findByName } from '../../../traits/find-by.trait'

@Injectable()
export class RolesService extends EntityService<Roles> {
  constructor(@InjectModel(Roles) protected repository: typeof Roles) {
    super(repository)
  }

  findByName = findByName
}
