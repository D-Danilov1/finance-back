import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript'
import { Roles } from '../../roles/models/roles.model'
import { UsersRoles } from '../../many-to-many/users-roles.model'
import { EntityModel } from '../../../../classes/core/entity.model'
import { CompletedLessons } from '../../../lessonsComponent/completed-lessons/models/completed-lessons.model'

interface UserCreationAttrs {
  id: string
  email: string
  password: string
  start_of_subscription: string | null
  end_of_subscription: string | null
  banned_at: string | null
  banned_by: string | null
}

@Table({ tableName: 'Users' })
export class Users extends EntityModel<Users, UserCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.STRING })
  banned_by: string | null

  @Column({ type: DataType.STRING })
  banned_at: string | null

  @Column({ type: DataType.STRING })
  start_of_subscription: string | null

  @Column({ type: DataType.STRING })
  end_of_subscription: string | null

  @BelongsToMany(() => Roles, () => UsersRoles)
  roles: Roles[]

  @HasMany(() => CompletedLessons)
  completedLessons: CompletedLessons[]
}
