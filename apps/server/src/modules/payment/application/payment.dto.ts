import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PaymentCreateDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  paymentDate: string

  @IsString()
  @IsNotEmpty()
  paymentMethod: string

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

export class PaymentUpdateDto {
  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  paymentDate?: string

  @IsString()
  @IsOptional()
  paymentMethod?: string

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
