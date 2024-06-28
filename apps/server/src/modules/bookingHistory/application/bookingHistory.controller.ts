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
import {
  BookingHistory,
  BookingHistoryDomainFacade,
} from '@server/modules/bookingHistory/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { BookingHistoryApplicationEvent } from './bookingHistory.application.event'
import {
  BookingHistoryCreateDto,
  BookingHistoryUpdateDto,
} from './bookingHistory.dto'

@Controller('/v1/bookingHistorys')
export class BookingHistoryController {
  constructor(
    private eventService: EventService,
    private bookingHistoryDomainFacade: BookingHistoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.bookingHistoryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: BookingHistoryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.bookingHistoryDomainFacade.create(body)

    await this.eventService.emit<BookingHistoryApplicationEvent.BookingHistoryCreated.Payload>(
      BookingHistoryApplicationEvent.BookingHistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:bookingHistoryId')
  async findOne(
    @Param('bookingHistoryId') bookingHistoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.bookingHistoryDomainFacade.findOneByIdOrFail(
      bookingHistoryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:bookingHistoryId')
  async update(
    @Param('bookingHistoryId') bookingHistoryId: string,
    @Body() body: BookingHistoryUpdateDto,
  ) {
    const item =
      await this.bookingHistoryDomainFacade.findOneByIdOrFail(bookingHistoryId)

    const itemUpdated = await this.bookingHistoryDomainFacade.update(
      item,
      body as Partial<BookingHistory>,
    )
    return itemUpdated
  }

  @Delete('/:bookingHistoryId')
  async delete(@Param('bookingHistoryId') bookingHistoryId: string) {
    const item =
      await this.bookingHistoryDomainFacade.findOneByIdOrFail(bookingHistoryId)

    await this.bookingHistoryDomainFacade.delete(item)

    return item
  }
}
