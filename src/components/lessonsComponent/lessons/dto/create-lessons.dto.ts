import { IsString, Length } from 'class-validator'

export class CreateLessonsDto {
  @IsString({ message: 'The value must be a string' })
  @Length(2, 255, {
    message: 'The name must be at least 2 and no more than 255 characters',
  })
  readonly name: string;

  @IsString({ message: 'The value must be a string' })
  @Length(2, 255, {
    message: 'The image must be at least 2 and no more than 255 characters',
  })
  readonly image: string;

  @IsString({ message: 'The value must be a string' })
  @Length(2, 255, {
    message: 'The link must be at least 2 and no more than 255 characters',
  })
  readonly link: string;
}
