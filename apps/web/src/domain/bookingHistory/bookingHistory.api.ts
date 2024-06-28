import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { BookingHistory } from './bookingHistory.model'

export class BookingHistoryApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<BookingHistory>,
  ): Promise<BookingHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/bookingHistorys${buildOptions}`)
  }

  static findOne(
    bookingHistoryId: string,
    queryOptions?: ApiHelper.QueryOptions<BookingHistory>,
  ): Promise<BookingHistory> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/bookingHistorys/${bookingHistoryId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<BookingHistory>): Promise<BookingHistory> {
    return HttpService.api.post(`/v1/bookingHistorys`, values)
  }

  static updateOne(
    bookingHistoryId: string,
    values: Partial<BookingHistory>,
  ): Promise<BookingHistory> {
    return HttpService.api.patch(
      `/v1/bookingHistorys/${bookingHistoryId}`,
      values,
    )
  }

  static deleteOne(bookingHistoryId: string): Promise<void> {
    return HttpService.api.delete(`/v1/bookingHistorys/${bookingHistoryId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<BookingHistory>,
  ): Promise<BookingHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/bookingHistorys${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<BookingHistory>,
  ): Promise<BookingHistory> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/bookingHistorys`,
      values,
    )
  }

  static findManyByBookingId(
    bookingId: string,
    queryOptions?: ApiHelper.QueryOptions<BookingHistory>,
  ): Promise<BookingHistory[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/bookings/booking/${bookingId}/bookingHistorys${buildOptions}`,
    )
  }

  static createOneByBookingId(
    bookingId: string,
    values: Partial<BookingHistory>,
  ): Promise<BookingHistory> {
    return HttpService.api.post(
      `/v1/bookings/booking/${bookingId}/bookingHistorys`,
      values,
    )
  }
}
