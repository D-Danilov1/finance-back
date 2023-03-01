import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ParseXlsxDto {
  @IsString()
  path: string

  @IsOptional()
  @IsNumber({}, { message: 'The value must be a number' })
  client_id: number

  @IsOptional()
  @IsNumber({}, { message: 'The value must be a number' })
  acceptance_file_id: number

  @IsOptional()
  @IsNumber({}, { message: 'The value must be a number' })
  shipment_file_id: number
}
