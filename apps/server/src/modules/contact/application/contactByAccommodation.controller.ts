import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ContactDomainFacade } from '@server/modules/contact/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ContactApplicationEvent } from './contact.application.event'
import { ContactCreateDto } from './contact.dto'

import { AccommodationDomainFacade } from '../../accommodation/domain'

@Controller('/v1/accommodations')
export class ContactByAccommodationController {
  constructor(
    private accommodationDomainFacade: AccommodationDomainFacade,

    private contactDomainFacade: ContactDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/accommodation/:accommodationId/contacts')
  async findManyAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.accommodationDomainFacade.findOneByIdOrFail(accommodationId)

    const items = await this.contactDomainFacade.findManyByAccommodation(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/accommodation/:accommodationId/contacts')
  async createByAccommodationId(
    @Param('accommodationId') accommodationId: string,
    @Body() body: ContactCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, accommodationId }

    const item = await this.contactDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ContactApplicationEvent.ContactCreated.Payload>(
      ContactApplicationEvent.ContactCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
