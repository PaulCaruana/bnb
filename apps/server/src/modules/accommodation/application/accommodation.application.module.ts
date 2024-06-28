import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AccommodationDomainModule } from '../domain'
import { AccommodationController } from './accommodation.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AccommodationByUserController } from './accommodationByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AccommodationDomainModule,

    UserDomainModule,
  ],
  controllers: [AccommodationController, AccommodationByUserController],
  providers: [],
})
export class AccommodationApplicationModule {}
