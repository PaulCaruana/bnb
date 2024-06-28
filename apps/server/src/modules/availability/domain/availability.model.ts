import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Accommodation } from '../../../modules/accommodation/domain'

@Entity()
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  date: string

  @Column({})
  isAvailable: boolean

  @Column({})
  accommodationId: string

  @ManyToOne(() => Accommodation, parent => parent.availabilitys)
  @JoinColumn({ name: 'accommodationId' })
  accommodation?: Accommodation

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
