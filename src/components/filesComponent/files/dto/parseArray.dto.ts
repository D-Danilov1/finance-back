import { IsArray, IsNumber, IsOptional } from 'class-validator'

export class ParseArrayDto {
  @IsArray()
  data: [string[]]

  @IsOptional()
  @IsNumber({}, { message: 'The value must be a number' })
  client_id: number
}
