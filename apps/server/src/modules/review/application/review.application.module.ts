import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReviewDomainModule } from '../domain'
import { ReviewController } from './review.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ReviewByUserController } from './reviewByUser.controller'

import { AccommodationDomainModule } from '../../../modules/accommodation/domain'

import { ReviewByAccommodationController } from './reviewByAccommodation.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReviewDomainModule,

    UserDomainModule,

    AccommodationDomainModule,
  ],
  controllers: [
    ReviewController,

    ReviewByUserController,

    ReviewByAccommodationController,
  ],
  providers: [],
})
export class ReviewApplicationModule {}
