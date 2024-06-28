import { User } from '../user'

import { Accommodation } from '../accommodation'

export class Review {
  id: string

  rating: number

  comment: string

  userId: string

  user?: User

  accommodationId: string

  accommodation?: Accommodation

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
