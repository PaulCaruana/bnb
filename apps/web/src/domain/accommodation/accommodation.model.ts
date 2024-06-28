import { User } from '../user'

import { Availability } from '../availability'

import { Booking } from '../booking'

import { Review } from '../review'

import { Contact } from '../contact'

export class Accommodation {
  id: string

  title: string

  description: string

  type: string

  address: string

  hostId: string

  host?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  availabilitys?: Availability[]

  bookings?: Booking[]

  reviews?: Review[]

  contacts?: Contact[]
}
