import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Accommodation } from './accommodation.model'

export class AccommodationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Accommodation>,
  ): Promise<Accommodation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/accommodations${buildOptions}`)
  }

  static findOne(
    accommodationId: string,
    queryOptions?: ApiHelper.QueryOptions<Accommodation>,
  ): Promise<Accommodation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/accommodations/${accommodationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Accommodation>): Promise<Accommodation> {
    return HttpService.api.post(`/v1/accommodations`, values)
  }

  static updateOne(
    accommodationId: string,
    values: Partial<Accommodation>,
  ): Promise<Accommodation> {
    return HttpService.api.patch(
      `/v1/accommodations/${accommodationId}`,
      values,
    )
  }

  static deleteOne(accommodationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/accommodations/${accommodationId}`)
  }

  static findManyByHostId(
    hostId: string,
    queryOptions?: ApiHelper.QueryOptions<Accommodation>,
  ): Promise<Accommodation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/host/${hostId}/accommodations${buildOptions}`,
    )
  }

  static createOneByHostId(
    hostId: string,
    values: Partial<Accommodation>,
  ): Promise<Accommodation> {
    return HttpService.api.post(
      `/v1/users/host/${hostId}/accommodations`,
      values,
    )
  }
}
