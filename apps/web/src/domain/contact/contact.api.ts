import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Contact } from './contact.model'

export class ContactApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Contact>,
  ): Promise<Contact[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/contacts${buildOptions}`)
  }

  static findOne(
    contactId: string,
    queryOptions?: ApiHelper.QueryOptions<Contact>,
  ): Promise<Contact> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/contacts/${contactId}${buildOptions}`)
  }

  static createOne(values: Partial<Contact>): Promise<Contact> {
    return HttpService.api.post(`/v1/contacts`, values)
  }

  static updateOne(
    contactId: string,
    values: Partial<Contact>,
  ): Promise<Contact> {
    return HttpService.api.patch(`/v1/contacts/${contactId}`, values)
  }

  static deleteOne(contactId: string): Promise<void> {
    return HttpService.api.delete(`/v1/contacts/${contactId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Contact>,
  ): Promise<Contact[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/contacts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Contact>,
  ): Promise<Contact> {
    return HttpService.api.post(`/v1/users/user/${userId}/contacts`, values)
  }

  static findManyByAccommodationId(
    accommodationId: string,
    queryOptions?: ApiHelper.QueryOptions<Contact>,
  ): Promise<Contact[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/accommodations/accommodation/${accommodationId}/contacts${buildOptions}`,
    )
  }

  static createOneByAccommodationId(
    accommodationId: string,
    values: Partial<Contact>,
  ): Promise<Contact> {
    return HttpService.api.post(
      `/v1/accommodations/accommodation/${accommodationId}/contacts`,
      values,
    )
  }
}
