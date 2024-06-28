import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { BookingHistoryDomainFacade } from '@server/modules/bookingHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { BookingHistoryApplicationEvent } from './bookingHistory.application.event'
import { BookingHistoryCreateDto } from './bookingHistory.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class BookingHistoryByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private bookingHistoryDomainFacade: BookingHistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/bookingHistorys')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.bookingHistoryDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/bookingHistorys')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: BookingHistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
