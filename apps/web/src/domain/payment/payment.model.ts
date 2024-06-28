import { Booking } from '../booking'

export class Payment {
  id: string

  amount: number

  paymentDate: string

  paymentMethod: string

  bookingId: string

  booking?: Booking

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
