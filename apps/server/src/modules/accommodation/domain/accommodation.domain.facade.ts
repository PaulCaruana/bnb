import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Accommodation } from './accommodation.model'

import { User } from '../../user/domain'

@Injectable()
export class AccommodationDomainFacade {
  constructor(
    @InjectRepository(Accommodation)
    private repository: Repository<Accommodation>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Accommodation>): Promise<Accommodation> {
    return this.repository.save(values)
  }

  async update(
    item: Accommodation,
    values: Partial<Accommodation>,
  ): Promise<Accommodation> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Accommodation): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Accommodation> = {},
  ): Promise<Accommodation[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Accommodation> = {},
  ): Promise<Accommodation> {
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

  async findManyByHost(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Accommodation> = {},
  ): Promise<Accommodation[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('host')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        hostId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
