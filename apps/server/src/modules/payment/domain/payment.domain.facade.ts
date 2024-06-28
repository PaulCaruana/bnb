import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Payment } from './payment.model'

import { Booking } from '../../booking/domain'

@Injectable()
export class PaymentDomainFacade {
  constructor(
    @InjectRepository(Payment)
    private repository: Repository<Payment>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Payment>): Promise<Payment> {
    return this.repository.save(values)
  }

  async update(item: Payment, values: Partial<Payment>): Promise<Payment> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Payment): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Payment> = {},
  ): Promise<Payment[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Payment> = {},
  ): Promise<Payment> {
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

  async findManyByBooking(
    item: Booking,
    queryOptions: RequestHelper.QueryOptions<Payment> = {},
  ): Promise<Payment[]> {
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
