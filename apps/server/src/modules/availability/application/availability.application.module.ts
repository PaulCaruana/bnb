import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AvailabilityDomainModule } from '../domain'
import { AvailabilityController } from './availability.controller'

import { AccommodationDomainModule } from '../../../modules/accommodation/domain'

import { AvailabilityByAccommodationController } from './availabilityByAccommodation.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AvailabilityDomainModule,

    AccommodationDomainModule,
  ],
  controllers: [AvailabilityController, AvailabilityByAccommodationController],
  providers: [],
})
export class AvailabilityApplicationModule {}
