import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AvailabilityCreateDto {
  @IsString()
  @IsNotEmpty()
  date: string

  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean

  @IsString()
  @IsOptional()
  accommodationId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class AvailabilityUpdateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean

  @IsString()
  @IsOptional()
  accommodationId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
