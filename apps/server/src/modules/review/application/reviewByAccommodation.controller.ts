import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReviewDomainFacade } from '@server/modules/review/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReviewApplicationEvent } from './review.application.event'
import { ReviewCreateDto } from './review.dto'

import { AccommodationDomainFacade } from '../../accommodation/domain'

@Controller('/v1/accommodations')
export class ReviewByAccommodationController {
  constructor(
    private accommodationDomainFacade: AccommodationDomainFacade,

    private reviewDomainFacade: ReviewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/accommodation/:accommodationId/reviews')
  async findManyAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.accommodationDomainFacade.findOneByIdOrFail(accommodationId)

    const items = await this.reviewDomainFacade.findManyByAccommodation(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/accommodation/:accommodationId/reviews')
  async createByAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Body() body: ReviewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, accommodationId }

    const item = await this.reviewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReviewApplicationEvent.ReviewCreated.Payload>(
      ReviewApplicationEvent.ReviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
