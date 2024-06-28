import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Payment, PaymentDomainFacade } from '@server/modules/payment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PaymentApplicationEvent } from './payment.application.event'
import { PaymentCreateDto, PaymentUpdateDto } from './payment.dto'

@Controller('/v1/payments')
export class PaymentController {
  constructor(
    private eventService: EventService,
    private paymentDomainFacade: PaymentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.paymentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PaymentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.paymentDomainFacade.create(body)

    await this.eventService.emit<PaymentApplicationEvent.PaymentCreated.Payload>(
      PaymentApplicationEvent.PaymentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:paymentId')
  async findOne(
    @Param('paymentId') paymentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.paymentDomainFacade.findOneByIdOrFail(
      paymentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:paymentId')
  async update(
    @Param('paymentId') paymentId: string,
    @Body() body: PaymentUpdateDto,
  ) {
    const item = await this.paymentDomainFacade.findOneByIdOrFail(paymentId)

    const itemUpdated = await this.paymentDomainFacade.update(
      item,
      body as Partial<Payment>,
    )
    return itemUpdated
  }

  @Delete('/:paymentId')
  async delete(@Param('paymentId') paymentId: string) {
    const item = await this.paymentDomainFacade.findOneByIdOrFail(paymentId)

    await this.paymentDomainFacade.delete(item)

    return item
  }
}
