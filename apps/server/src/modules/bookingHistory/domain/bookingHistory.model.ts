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

import { Booking } from '../../../modules/booking/domain'

@Entity()
export class BookingHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  action: string

  @Column({})
  actionDate: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.bookingHistorys)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  bookingId: string

  @ManyToOne(() => Booking, parent => parent.bookingHistorys)
  @JoinColumn({ name: 'bookingId' })
  booking?: Booking

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
