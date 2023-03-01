import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { EntityModel } from '../../../../classes/core/entity.model'
import { Courses } from '../../courses/models/courses.model'
import { Lessons } from '../../lessons/models/lessons.model'

interface LessonsInCoursesCreationAttrs {
  lesson_id: number
  course_id: number
  deleted_at: string | null
  deleted_by: string | null
}

@Table({ tableName: 'LessonsInCourses' })
export class LessonsInCourses extends EntityModel<LessonsInCourses, LessonsInCoursesCreationAttrs> {
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

  @ForeignKey(() => Lessons)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lesson_id: number

  @ForeignKey(() => Courses)
  @Column({ type: DataType.INTEGER, allowNull: false })
  course_id: number
}
