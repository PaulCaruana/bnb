import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AccommodationDomainFacade } from './accommodation.domain.facade'
import { Accommodation } from './accommodation.model'

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation]), DatabaseHelperModule],
  providers: [AccommodationDomainFacade, AccommodationDomainFacade],
  exports: [AccommodationDomainFacade],
})
export class AccommodationDomainModule {}
