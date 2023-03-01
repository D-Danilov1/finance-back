import { Column, DataType, HasMany, Table } from 'sequelize-typescript'
import { EntityModel } from '../../../../classes/core/entity.model'
import { LessonSchedule } from '../../lessonSchedule/models/lesson-schedule.model'

interface DaysCreationAttrs {
  name: string
}

@Table({ tableName: 'Days' })
export class Days extends EntityModel<Days, DaysCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @HasMany(() => LessonSchedule)
  lessonSchedule: LessonSchedule[]
}
