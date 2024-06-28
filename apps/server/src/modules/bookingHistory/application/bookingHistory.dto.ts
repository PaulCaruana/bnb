import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class BookingHistoryCreateDto {
  @IsString()
  @IsNotEmpty()
  action: string

  @IsString()
  @IsNotEmpty()
  actionDate: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  bookingId?: string

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

export class BookingHistoryUpdateDto {
  @IsString()
  @IsOptional()
  action?: string

  @IsString()
  @IsOptional()
  actionDate?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  bookingId?: string

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
