import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationAccommodationSubscriber } from './subscribers/notification.accommodation.subscriber'

import { NotificationAvailabilitySubscriber } from './subscribers/notification.availability.subscriber'

import { NotificationBookingSubscriber } from './subscribers/notification.booking.subscriber'

import { NotificationReviewSubscriber } from './subscribers/notification.review.subscriber'

import { NotificationContactSubscriber } from './subscribers/notification.contact.subscriber'

import { NotificationPaymentSubscriber } from './subscribers/notification.payment.subscriber'

import { NotificationBookingHistorySubscriber } from './subscribers/notification.bookingHistory.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationAccommodationSubscriber,

    NotificationAvailabilitySubscriber,

    NotificationBookingSubscriber,

    NotificationReviewSubscriber,

    NotificationContactSubscriber,

    NotificationPaymentSubscriber,

    NotificationBookingHistorySubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
