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

import { Accommodation } from '../../../modules/accommodation/domain'

import { Payment } from '../../../modules/payment/domain'

import { BookingHistory } from '../../../modules/bookingHistory/domain'

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  startDate: string

  @Column({})
  endDate: string

  @Column({})
  status: string

  @Column({})
  paymentStatus: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.bookings)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  accommodationId: string

  @ManyToOne(() => Accommodation, parent => parent.bookings)
  @JoinColumn({ name: 'accommodationId' })
  accommodation?: Accommodation

  @OneToMany(() => Payment, child => child.booking)
  payments?: Payment[]

  @OneToMany(() => BookingHistory, child => child.booking)
  bookingHistorys?: BookingHistory[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
