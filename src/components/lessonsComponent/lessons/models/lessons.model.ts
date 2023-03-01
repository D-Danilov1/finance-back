import { Column, DataType, HasMany, Table } from 'sequelize-typescript'
import { EntityModel } from '../../../../classes/core/entity.model'
import { LessonsInCourses } from '../../lessonsInCourses/models/lessons-in-courses.model'
import { LessonSchedule } from '../../lessonSchedule/models/lesson-schedule.model'

interface LessonsCreationAttrs {
  name: string
  image: string
  link: string | null
  deleted_at: string | null
  deleted_by: number | null
}

@Table({ tableName: 'Lessons' })
export class Lessons extends EntityModel<Lessons, LessonsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @Column({ type: DataType.STRING, allowNull: false })
  image: string

  @Column({ type: DataType.STRING })
  link: string | null

  @Column({ type: DataType.STRING })
  deleted_at: string | null

  @Column({ type: DataType.STRING })
  deleted_by: string | null

  @HasMany(() => LessonsInCourses)
  lessonInCourses: LessonsInCourses[]

  @HasMany(() => LessonSchedule)
  lessonSchedule: LessonSchedule[]
}
