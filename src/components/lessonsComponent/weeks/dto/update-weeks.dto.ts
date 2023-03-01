import { IsString, Length } from 'class-validator'

export class UpdateWeeksDto {
  @IsString({ message: 'The value must be a string' })
  @Length(2, 255, {
    message: 'The name must be at least 2 and no more than 255 characters',
  })
  readonly name: string
}
