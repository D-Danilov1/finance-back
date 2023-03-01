import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript'
import { EntityModel } from '../../../../classes/core/entity.model'
import { CompletedLessons } from '../../completed-lessons/models/completed-lessons.model'
import { Days } from '../../days/models/days.model'
import { Lessons } from '../../lessons/models/lessons.model'
import { Weeks } from '../../weeks/models/weeks.model'

interface LessonScheduleCreationAttrs {
  lesson_id: number
  week_id: number
  day_id: number
  name: string
  deleted_at: string | null
  deleted_by: string | null
}

@Table({ tableName: 'LessonSchedule' })
export class LessonSchedule extends EntityModel<LessonSchedule, LessonScheduleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING })
  deleted_at: string | null

  @Column({ type: DataType.STRING })
  deleted_by: string | null

  @Column({ type: DataType.STRING })
  name: string

  @ForeignKey(() => Lessons)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lesson_id: number

  @ForeignKey(() => Weeks)
  @Column({ type: DataType.INTEGER, allowNull: false })
  week_id: number

  @ForeignKey(() => Days)
  @Column({ type: DataType.INTEGER, allowNull: false })
  day_id: number

  @HasMany(() => CompletedLessons)
  completedLessons: CompletedLessons[]

  @BelongsTo(() => Lessons)
  lesson: Lessons

  @BelongsTo(() => Days)
  day: Days
}
