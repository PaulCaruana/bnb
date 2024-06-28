import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Availability } from './availability.model'

export class AvailabilityApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Availability>,
  ): Promise<Availability[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/availabilitys${buildOptions}`)
  }

  static findOne(
    availabilityId: string,
    queryOptions?: ApiHelper.QueryOptions<Availability>,
  ): Promise<Availability> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/availabilitys/${availabilityId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Availability>): Promise<Availability> {
    return HttpService.api.post(`/v1/availabilitys`, values)
  }

  static updateOne(
    availabilityId: string,
    values: Partial<Availability>,
  ): Promise<Availability> {
    return HttpService.api.patch(`/v1/availabilitys/${availabilityId}`, values)
  }

  static deleteOne(availabilityId: string): Promise<void> {
    return HttpService.api.delete(`/v1/availabilitys/${availabilityId}`)
  }

  static findManyByAccommodationId(
    accommodationId: string,
    queryOptions?: ApiHelper.QueryOptions<Availability>,
  ): Promise<Availability[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/accommodations/accommodation/${accommodationId}/availabilitys${buildOptions}`,
    )
  }

  static createOneByAccommodationId(
    accommodationId: string,
    values: Partial<Availability>,
  ): Promise<Availability> {
    return HttpService.api.post(
      `/v1/accommodations/accommodation/${accommodationId}/availabilitys`,
      values,
    )
  }
}
