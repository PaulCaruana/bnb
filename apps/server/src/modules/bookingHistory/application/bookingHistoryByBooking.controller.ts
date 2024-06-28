import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { BookingHistoryDomainFacade } from '@server/modules/bookingHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { BookingHistoryApplicationEvent } from './bookingHistory.application.event'
import { BookingHistoryCreateDto } from './bookingHistory.dto'

import { BookingDomainFacade } from '../../booking/domain'

@Controller('/v1/bookings')
export class BookingHistoryByBookingController {
  constructor(
    private bookingDomainFacade: BookingDomainFacade,

    private bookingHistoryDomainFacade: BookingHistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/booking/:bookingId/bookingHistorys')
  async findManyBookingId(
    @Param('bookingId') bookingId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.bookingDomainFacade.findOneByIdOrFail(bookingId)

    const items = await this.bookingHistoryDomainFacade.findManyByBooking(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/booking/:bookingId/bookingHistorys')
  async createByBookingId(
    @Param('bookingId') bookingId: string,
    @Body() body: BookingHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, bookingId }

    const item = await this.bookingHistoryDomainFacade.create(valuesUpdated)

    await this.eventService.emit<BookingHistoryApplicationEvent.BookingHistoryCreated.Payload>(
      BookingHistoryApplicationEvent.BookingHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
