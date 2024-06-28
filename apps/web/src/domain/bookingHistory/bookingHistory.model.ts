import { User } from '../user'

import { Booking } from '../booking'

export class BookingHistory {
  id: string

  action: string

  actionDate: string

  userId: string

  user?: User

  bookingId: string

  booking?: Booking

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
