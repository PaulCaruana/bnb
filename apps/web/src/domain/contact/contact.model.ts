import { User } from '../user'

import { Accommodation } from '../accommodation'

export class Contact {
  id: string

  message: string

  userId: string

  user?: User

  accommodationId: string

  accommodation?: Accommodation

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
