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
import { Contact, ContactDomainFacade } from '@server/modules/contact/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ContactApplicationEvent } from './contact.application.event'
import { ContactCreateDto, ContactUpdateDto } from './contact.dto'

@Controller('/v1/contacts')
export class ContactController {
  constructor(
    private eventService: EventService,
    private contactDomainFacade: ContactDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.contactDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ContactCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.contactDomainFacade.create(body)

    await this.eventService.emit<ContactApplicationEvent.ContactCreated.Payload>(
      ContactApplicationEvent.ContactCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:contactId')
  async findOne(
    @Param('contactId') contactId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.contactDomainFacade.findOneByIdOrFail(
      contactId,
      queryOptions,
    )

    return item
  }

  @Patch('/:contactId')
  async update(
    @Param('contactId') contactId: string,
    @Body() body: ContactUpdateDto,
  ) {
    const item = await this.contactDomainFacade.findOneByIdOrFail(contactId)

    const itemUpdated = await this.contactDomainFacade.update(
      item,
      body as Partial<Contact>,
    )
    return itemUpdated
  }

  @Delete('/:contactId')
  async delete(@Param('contactId') contactId: string) {
    const item = await this.contactDomainFacade.findOneByIdOrFail(contactId)

    await this.contactDomainFacade.delete(item)

    return item
  }
}
