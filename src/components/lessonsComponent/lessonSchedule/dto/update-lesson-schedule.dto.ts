import { IsNumber, IsString, Length } from 'class-validator'

export class UpdateLessonScheduleDto {
  @IsNumber({}, { message: 'The value must be a number' })
  readonly lesson_id: number

  @IsNumber({}, { message: 'The value must be a number' })
  readonly day_id: number

  @IsNumber({}, { message: 'The value must be a number' })
  readonly week_id: number

  @IsString({ message: 'The value must be a string' })
  @Length(2, 255, {
    message: 'The name must be at least 2 and no more than 255 characters',
  })
  readonly name: string
}
