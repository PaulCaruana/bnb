import { Notification } from '../notification'

import { Accommodation } from '../accommodation'

import { Booking } from '../booking'

import { Review } from '../review'

import { Contact } from '../contact'

import { BookingHistory } from '../bookingHistory'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  accommodationsAsHost?: Accommodation[]

  bookings?: Booking[]

  reviews?: Review[]

  contacts?: Contact[]

  bookingHistorys?: BookingHistory[]
}
