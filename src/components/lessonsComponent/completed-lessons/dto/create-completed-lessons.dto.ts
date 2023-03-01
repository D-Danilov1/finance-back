import { IsNumber, IsString, Length } from 'class-validator'

export class CreateCompletedLessonsDto {
  @IsString({ message: 'The value must be a string' })
  @Length(2, 255, {
    message: 'The image must be at least 2 and no more than 255 characters',
  })
  user_id: string

  @IsNumber({}, { message: 'The value must be a number' })
  lesson_schedule_id: number
}
