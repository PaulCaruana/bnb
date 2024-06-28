import { User } from '../user'

import { Accommodation } from '../accommodation'

import { Payment } from '../payment'

import { BookingHistory } from '../bookingHistory'

export class Booking {
  id: string

  startDate: string

  endDate: string

  status: string

  paymentStatus: string

  userId: string

  user?: User

  accommodationId: string

  accommodation?: Accommodation

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  payments?: Payment[]

  bookingHistorys?: BookingHistory[]
}
