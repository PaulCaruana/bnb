import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AvailabilityDomainFacade } from './availability.domain.facade'
import { Availability } from './availability.model'

@Module({
  imports: [TypeOrmModule.forFeature([Availability]), DatabaseHelperModule],
  providers: [AvailabilityDomainFacade, AvailabilityDomainFacade],
  exports: [AvailabilityDomainFacade],
})
export class AvailabilityDomainModule {}
