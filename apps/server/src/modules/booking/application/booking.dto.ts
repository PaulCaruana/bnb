import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class BookingCreateDto {
  @IsString()
  @IsNotEmpty()
  startDate: string

  @IsString()
  @IsNotEmpty()
  endDate: string

  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsNotEmpty()
  paymentStatus: string

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

export class BookingUpdateDto {
  @IsString()
  @IsOptional()
  startDate?: string

  @IsString()
  @IsOptional()
  endDate?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  paymentStatus?: string

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
