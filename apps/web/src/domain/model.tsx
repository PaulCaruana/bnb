import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Accommodation as AccommodationModel } from './accommodation/accommodation.model'

import { Availability as AvailabilityModel } from './availability/availability.model'

import { Booking as BookingModel } from './booking/booking.model'

import { Review as ReviewModel } from './review/review.model'

import { Contact as ContactModel } from './contact/contact.model'

import { Payment as PaymentModel } from './payment/payment.model'

import { BookingHistory as BookingHistoryModel } from './bookingHistory/bookingHistory.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Accommodation extends AccommodationModel {}

  export class Availability extends AvailabilityModel {}

  export class Booking extends BookingModel {}

  export class Review extends ReviewModel {}

  export class Contact extends ContactModel {}

  export class Payment extends PaymentModel {}

  export class BookingHistory extends BookingHistoryModel {}
}
