import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CompletedLessons } from './models/completed-lessons.model'
import { EntityService } from '../../../classes/core/entity.service'

@Injectable()
export class CompletedLessonsService extends EntityService<CompletedLessons> {
  constructor(
    @InjectModel(CompletedLessons)
    protected repository: typeof CompletedLessons,
  ) {
    super(repository)
  }

  async findByScheduleId(id: number) {
    return await this.repository.findOne({
      where: { lesson_schedule_id: id },
    })
  }

  async findAllBySchedule() {
    const results = await this.repository.findAll({
      attributes: ['lesson_schedule_id'],
    })

    return results.map((result) => result.lesson_schedule_id)
  }
}
