import { IsEmail, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateFundsDto {
  @IsString({message: 'The value must be a string'})
  @Length(2, 128, {message: 'The name must be at least 2 and no more than 128 characters'})
  readonly name: string;

  @IsString({message: 'The value must be a string'})
  @IsEmail({}, {message: 'Incorrect Email'})
  @Length(6, 128, {message: 'The userEmail must be at least 6 and no more than 128 characters'})
  readonly userEmail: string;

  @IsNumber({}, {message: 'The value must be a number'})
  @IsPositive({message: 'The value must be a positive number'})
  readonly percent: number;
}
