import { EntityModel } from './entity.model'
import { InjectModel } from '@nestjs/sequelize'

export abstract class EntityService<M> {
  protected constructor(@InjectModel(EntityModel) protected repository: typeof EntityModel<any>) {}

  async create(dto: any): Promise<M> {
    return (await this.repository.create(dto)) as M
  }

  async findAll(): Promise<M[]> {
    return (await this.repository.findAll()) as M[]
  }

  async findByPk(id: any): Promise<M> {
    return (await this.repository.findByPk(id)) as M
  }

  async update(dto: any): Promise<number[]> {
    return this.repository.update(dto, { where: { id: dto.id } })
  }

  async destroy(id: any): Promise<number> {
    return await this.repository.destroy({ where: { id: id } })
  }

  async destroyUsers() {
    return await this.repository.destroy()
  }
}
