import { Accommodation } from '../accommodation'

export class Availability {
  id: string

  date: string

  isAvailable: boolean

  accommodationId: string

  accommodation?: Accommodation

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
