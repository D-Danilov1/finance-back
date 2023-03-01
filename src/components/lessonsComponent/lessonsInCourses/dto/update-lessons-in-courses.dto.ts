import { IsNumber } from 'class-validator'

export class UpdateLessonsInCoursesDto {
  @IsNumber({}, { message: 'The value must be a number' })
  readonly lesson_id: number

  @IsNumber({}, { message: 'The value must be a number' })
  readonly course_id: number
}
