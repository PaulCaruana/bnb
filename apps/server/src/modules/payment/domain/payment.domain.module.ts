import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PaymentDomainFacade } from './payment.domain.facade'
import { Payment } from './payment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), DatabaseHelperModule],
  providers: [PaymentDomainFacade, PaymentDomainFacade],
  exports: [PaymentDomainFacade],
})
export class PaymentDomainModule {}
