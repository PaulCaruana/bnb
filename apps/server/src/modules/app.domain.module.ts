import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { AccommodationDomainModule } from './accommodation/domain'

import { AvailabilityDomainModule } from './availability/domain'

import { BookingDomainModule } from './booking/domain'

import { ReviewDomainModule } from './review/domain'

import { ContactDomainModule } from './contact/domain'

import { PaymentDomainModule } from './payment/domain'

import { BookingHistoryDomainModule } from './bookingHistory/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    AccommodationDomainModule,

    AvailabilityDomainModule,

    BookingDomainModule,

    ReviewDomainModule,

    ContactDomainModule,

    PaymentDomainModule,

    BookingHistoryDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
