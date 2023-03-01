import { IsString } from 'class-validator'

export class UpdateUsersDto {
  @IsString({ message: 'The value must be a string' })
  readonly id: string
}
