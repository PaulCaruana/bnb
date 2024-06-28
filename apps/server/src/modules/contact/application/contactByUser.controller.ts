import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ContactDomainFacade } from '@server/modules/contact/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ContactApplicationEvent } from './contact.application.event'
import { ContactCreateDto } from './contact.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ContactByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private contactDomainFacade: ContactDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/contacts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.contactDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/contacts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ContactCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
