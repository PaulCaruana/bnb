import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AccommodationDomainFacade } from '@server/modules/accommodation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AccommodationApplicationEvent } from './accommodation.application.event'
import { AccommodationCreateDto } from './accommodation.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AccommodationByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private accommodationDomainFacade: AccommodationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/host/:hostId/accommodations')
  async findManyHostId(
    @Param('hostId') hostId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(hostId)

    const items = await this.accommodationDomainFacade.findManyByHost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/host/:hostId/accommodations')
  async createByHostId(
    @Param('hostId') hostId: string,
    @Body() body: AccommodationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, hostId }

    const item = await this.accommodationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AccommodationApplicationEvent.AccommodationCreated.Payload>(
      AccommodationApplicationEvent.AccommodationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
