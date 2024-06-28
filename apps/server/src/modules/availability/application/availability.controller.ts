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
  Availability,
  AvailabilityDomainFacade,
} from '@server/modules/availability/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AvailabilityApplicationEvent } from './availability.application.event'
import {
  AvailabilityCreateDto,
  AvailabilityUpdateDto,
} from './availability.dto'

@Controller('/v1/availabilitys')
export class AvailabilityController {
  constructor(
    private eventService: EventService,
    private availabilityDomainFacade: AvailabilityDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.availabilityDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AvailabilityCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.availabilityDomainFacade.create(body)

    await this.eventService.emit<AvailabilityApplicationEvent.AvailabilityCreated.Payload>(
      AvailabilityApplicationEvent.AvailabilityCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:availabilityId')
  async findOne(
    @Param('availabilityId') availabilityId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.availabilityDomainFacade.findOneByIdOrFail(
      availabilityId,
      queryOptions,
    )

    return item
  }

  @Patch('/:availabilityId')
  async update(
    @Param('availabilityId') availabilityId: string,
    @Body() body: AvailabilityUpdateDto,
  ) {
    const item =
      await this.availabilityDomainFacade.findOneByIdOrFail(availabilityId)

    const itemUpdated = await this.availabilityDomainFacade.update(
      item,
      body as Partial<Availability>,
    )
    return itemUpdated
  }

  @Delete('/:availabilityId')
  async delete(@Param('availabilityId') availabilityId: string) {
    const item =
      await this.availabilityDomainFacade.findOneByIdOrFail(availabilityId)

    await this.availabilityDomainFacade.delete(item)

    return item
  }
}
