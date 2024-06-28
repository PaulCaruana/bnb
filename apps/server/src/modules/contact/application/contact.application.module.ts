import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ContactDomainModule } from '../domain'
import { ContactController } from './contact.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ContactByUserController } from './contactByUser.controller'

import { AccommodationDomainModule } from '../../../modules/accommodation/domain'

import { ContactByAccommodationController } from './contactByAccommodation.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ContactDomainModule,

    UserDomainModule,

    AccommodationDomainModule,
  ],
  controllers: [
    ContactController,

    ContactByUserController,

    ContactByAccommodationController,
  ],
  providers: [],
})
export class ContactApplicationModule {}
