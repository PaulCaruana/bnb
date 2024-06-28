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

import { Booking } from '../../../modules/booking/domain'

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  amount: number

  @Column({})
  paymentDate: string

  @Column({})
  paymentMethod: string

  @Column({})
  bookingId: string

  @ManyToOne(() => Booking, parent => parent.payments)
  @JoinColumn({ name: 'bookingId' })
  booking?: Booking

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
