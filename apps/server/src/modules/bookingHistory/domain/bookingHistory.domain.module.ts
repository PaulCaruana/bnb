import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { BookingHistoryDomainFacade } from './bookingHistory.domain.facade'
import { BookingHistory } from './bookingHistory.model'

@Module({
  imports: [TypeOrmModule.forFeature([BookingHistory]), DatabaseHelperModule],
  providers: [BookingHistoryDomainFacade, BookingHistoryDomainFacade],
  exports: [BookingHistoryDomainFacade],
})
export class BookingHistoryDomainModule {}
