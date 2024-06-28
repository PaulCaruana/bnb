import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ContactCreateDto {
  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class ContactUpdateDto {
  @IsString()
  @IsOptional()
  message?: string

  @IsString()
  @IsOptional()
  userId?: string

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
