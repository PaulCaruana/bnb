import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { AccommodationApi } from './accommodation/accommodation.api'

import { AvailabilityApi } from './availability/availability.api'

import { BookingApi } from './booking/booking.api'

import { ReviewApi } from './review/review.api'

import { ContactApi } from './contact/contact.api'

import { PaymentApi } from './payment/payment.api'

import { BookingHistoryApi } from './bookingHistory/bookingHistory.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Accommodation extends AccommodationApi {}

  export class Availability extends AvailabilityApi {}

  export class Booking extends BookingApi {}

  export class Review extends ReviewApi {}

  export class Contact extends ContactApi {}

  export class Payment extends PaymentApi {}

  export class BookingHistory extends BookingHistoryApi {}
}
