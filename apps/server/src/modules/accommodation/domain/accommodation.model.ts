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

import { User } from '../../../modules/user/domain'

import { Availability } from '../../../modules/availability/domain'

import { Booking } from '../../../modules/booking/domain'

import { Review } from '../../../modules/review/domain'

import { Contact } from '../../../modules/contact/domain'

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  title: string

  @Column({})
  description: string

  @Column({})
  type: string

  @Column({})
  address: string

  @Column({})
  hostId: string

  @ManyToOne(() => User, parent => parent.accommodationsAsHost)
  @JoinColumn({ name: 'hostId' })
  host?: User

  @OneToMany(() => Availability, child => child.accommodation)
  availabilitys?: Availability[]

  @OneToMany(() => Booking, child => child.accommodation)
  bookings?: Booking[]

  @OneToMany(() => Review, child => child.accommodation)
  reviews?: Review[]

  @OneToMany(() => Contact, child => child.accommodation)
  contacts?: Contact[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
