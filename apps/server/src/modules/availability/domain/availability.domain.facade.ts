import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Availability } from './availability.model'

import { Accommodation } from '../../accommodation/domain'

@Injectable()
export class AvailabilityDomainFacade {
  constructor(
    @InjectRepository(Availability)
    private repository: Repository<Availability>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Availability>): Promise<Availability> {
    return this.repository.save(values)
  }

  async update(
    item: Availability,
    values: Partial<Availability>,
  ): Promise<Availability> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Availability): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Availability> = {},
  ): Promise<Availability[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Availability> = {},
  ): Promise<Availability> {
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

  async findManyByAccommodation(
    item: Accommodation,
    queryOptions: RequestHelper.QueryOptions<Availability> = {},
  ): Promise<Availability[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('accommodation')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        accommodationId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
