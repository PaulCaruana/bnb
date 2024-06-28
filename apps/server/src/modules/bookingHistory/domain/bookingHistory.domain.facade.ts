import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { BookingHistory } from './bookingHistory.model'

import { User } from '../../user/domain'

import { Booking } from '../../booking/domain'

@Injectable()
export class BookingHistoryDomainFacade {
  constructor(
    @InjectRepository(BookingHistory)
    private repository: Repository<BookingHistory>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<BookingHistory>): Promise<BookingHistory> {
    return this.repository.save(values)
  }

  async update(
    item: BookingHistory,
    values: Partial<BookingHistory>,
  ): Promise<BookingHistory> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: BookingHistory): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<BookingHistory> = {},
  ): Promise<BookingHistory[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<BookingHistory> = {},
  ): Promise<BookingHistory> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<BookingHistory> = {},
  ): Promise<BookingHistory[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByBooking(
    item: Booking,
    queryOptions: RequestHelper.QueryOptions<BookingHistory> = {},
  ): Promise<BookingHistory[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('booking')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        bookingId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
