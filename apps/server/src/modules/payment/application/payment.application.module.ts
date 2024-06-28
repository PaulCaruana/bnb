import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PaymentDomainModule } from '../domain'
import { PaymentController } from './payment.controller'

import { BookingDomainModule } from '../../../modules/booking/domain'

import { PaymentByBookingController } from './paymentByBooking.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PaymentDomainModule,

    BookingDomainModule,
  ],
  controllers: [PaymentController, PaymentByBookingController],
  providers: [],
})
export class PaymentApplicationModule {}
