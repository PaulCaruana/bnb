import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { BookingHistoryDomainModule } from '../domain'
import { BookingHistoryController } from './bookingHistory.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { BookingHistoryByUserController } from './bookingHistoryByUser.controller'

import { BookingDomainModule } from '../../../modules/booking/domain'

import { BookingHistoryByBookingController } from './bookingHistoryByBooking.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    BookingHistoryDomainModule,

    UserDomainModule,

    BookingDomainModule,
  ],
  controllers: [
    BookingHistoryController,

    BookingHistoryByUserController,

    BookingHistoryByBookingController,
  ],
  providers: [],
})
export class BookingHistoryApplicationModule {}
