import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PaymentDomainFacade } from '@server/modules/payment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PaymentApplicationEvent } from './payment.application.event'
import { PaymentCreateDto } from './payment.dto'

import { BookingDomainFacade } from '../../booking/domain'

@Controller('/v1/bookings')
export class PaymentByBookingController {
  constructor(
    private bookingDomainFacade: BookingDomainFacade,

    private paymentDomainFacade: PaymentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/booking/:bookingId/payments')
  async findManyBookingId(
    @Param('bookingId') bookingId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.bookingDomainFacade.findOneByIdOrFail(bookingId)

    const items = await this.paymentDomainFacade.findManyByBooking(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/booking/:bookingId/payments')
  async createByBookingId(
    @Param('bookingId') bookingId: string,
    @Body() body: PaymentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, bookingId }

    const item = await this.paymentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PaymentApplicationEvent.PaymentCreated.Payload>(
      PaymentApplicationEvent.PaymentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
