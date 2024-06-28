import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { BookingDomainModule } from '../domain'
import { BookingController } from './booking.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { BookingByUserController } from './bookingByUser.controller'

import { AccommodationDomainModule } from '../../../modules/accommodation/domain'

import { BookingByAccommodationController } from './bookingByAccommodation.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    BookingDomainModule,

    UserDomainModule,

    AccommodationDomainModule,
  ],
  controllers: [
    BookingController,

    BookingByUserController,

    BookingByAccommodationController,
  ],
  providers: [],
})
export class BookingApplicationModule {}
