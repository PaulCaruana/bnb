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
  Accommodation,
  AccommodationDomainFacade,
} from '@server/modules/accommodation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AccommodationApplicationEvent } from './accommodation.application.event'
import {
  AccommodationCreateDto,
  AccommodationUpdateDto,
} from './accommodation.dto'

@Controller('/v1/accommodations')
export class AccommodationController {
  constructor(
    private eventService: EventService,
    private accommodationDomainFacade: AccommodationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.accommodationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AccommodationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.accommodationDomainFacade.create(body)

    await this.eventService.emit<AccommodationApplicationEvent.AccommodationCreated.Payload>(
      AccommodationApplicationEvent.AccommodationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:accommodationId')
  async findOne(
    @Param('accommodationId') accommodationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.accommodationDomainFacade.findOneByIdOrFail(
      accommodationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:accommodationId')
  async update(
    @Param('accommodationId') accommodationId: string,
    @Body() body: AccommodationUpdateDto,
  ) {
    const item =
      await this.accommodationDomainFacade.findOneByIdOrFail(accommodationId)

    const itemUpdated = await this.accommodationDomainFacade.update(
      item,
      body as Partial<Accommodation>,
    )
    return itemUpdated
  }

  @Delete('/:accommodationId')
  async delete(@Param('accommodationId') accommodationId: string) {
    const item =
      await this.accommodationDomainFacade.findOneByIdOrFail(accommodationId)

    await this.accommodationDomainFacade.delete(item)

    return item
  }
}
