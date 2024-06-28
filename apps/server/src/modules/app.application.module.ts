import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { AccommodationApplicationModule } from './accommodation/application'

import { AvailabilityApplicationModule } from './availability/application'

import { BookingApplicationModule } from './booking/application'

import { ReviewApplicationModule } from './review/application'

import { ContactApplicationModule } from './contact/application'

import { PaymentApplicationModule } from './payment/application'

import { BookingHistoryApplicationModule } from './bookingHistory/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    AccommodationApplicationModule,

    AvailabilityApplicationModule,

    BookingApplicationModule,

    ReviewApplicationModule,

    ContactApplicationModule,

    PaymentApplicationModule,

    BookingHistoryApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
