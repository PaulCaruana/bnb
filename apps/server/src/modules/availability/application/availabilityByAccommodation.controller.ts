import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AvailabilityDomainFacade } from '@server/modules/availability/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AvailabilityApplicationEvent } from './availability.application.event'
import { AvailabilityCreateDto } from './availability.dto'

import { AccommodationDomainFacade } from '../../accommodation/domain'

@Controller('/v1/accommodations')
export class AvailabilityByAccommodationController {
  constructor(
    private accommodationDomainFacade: AccommodationDomainFacade,

    private availabilityDomainFacade: AvailabilityDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/accommodation/:accommodationId/availabilitys')
  async findManyAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.accommodationDomainFacade.findOneByIdOrFail(accommodationId)

    const items = await this.availabilityDomainFacade.findManyByAccommodation(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/accommodation/:accommodationId/availabilitys')
  async createByAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Body() body: AvailabilityCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, accommodationId }

    const item = await this.availabilityDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AvailabilityApplicationEvent.AvailabilityCreated.Payload>(
      AvailabilityApplicationEvent.AvailabilityCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
