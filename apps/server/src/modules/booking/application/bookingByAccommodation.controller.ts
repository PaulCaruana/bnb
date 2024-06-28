import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { BookingDomainFacade } from '@server/modules/booking/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { BookingApplicationEvent } from './booking.application.event'
import { BookingCreateDto } from './booking.dto'

import { AccommodationDomainFacade } from '../../accommodation/domain'

@Controller('/v1/accommodations')
export class BookingByAccommodationController {
  constructor(
    private accommodationDomainFacade: AccommodationDomainFacade,

    private bookingDomainFacade: BookingDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/accommodation/:accommodationId/bookings')
  async findManyAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.accommodationDomainFacade.findOneByIdOrFail(accommodationId)

    const items = await this.bookingDomainFacade.findManyByAccommodation(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/accommodation/:accommodationId/bookings')
  async createByAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Body() body: BookingCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, accommodationId }

    const item = await this.bookingDomainFacade.create(valuesUpdated)

    await this.eventService.emit<BookingApplicationEvent.BookingCreated.Payload>(
      BookingApplicationEvent.BookingCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
