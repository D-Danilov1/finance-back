import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { Users } from '../../../usersComponent/users/models/users.model'
import { EntityModel } from '../../../../classes/core/entity.model'
import { LessonSchedule } from '../../lessonSchedule/models/lesson-schedule.model'

interface CompletedLessonsCreationAttrs {
  user_id: string
  lesson_schedule_id: number
  deleted_at: string | null
  deleted_by: string | null
}

@Table({ tableName: 'CompletedLessons' })
export class CompletedLessons extends EntityModel<CompletedLessons, CompletedLessonsCreationAttrs> {
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

  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING, allowNull: false })
  user_id: string

  @ForeignKey(() => LessonSchedule)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lesson_schedule_id: number
}
