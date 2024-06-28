import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ContactDomainFacade } from './contact.domain.facade'
import { Contact } from './contact.model'

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), DatabaseHelperModule],
  providers: [ContactDomainFacade, ContactDomainFacade],
  exports: [ContactDomainFacade],
})
export class ContactDomainModule {}
