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

import { Notification } from '../../../modules/notification/domain'

import { Accommodation } from '../../../modules/accommodation/domain'

import { Booking } from '../../../modules/booking/domain'

import { Review } from '../../../modules/review/domain'

import { Contact } from '../../../modules/contact/domain'

import { BookingHistory } from '../../../modules/bookingHistory/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Accommodation, child => child.host)
  accommodationsAsHost?: Accommodation[]

  @OneToMany(() => Booking, child => child.user)
  bookings?: Booking[]

  @OneToMany(() => Review, child => child.user)
  reviews?: Review[]

  @OneToMany(() => Contact, child => child.user)
  contacts?: Contact[]

  @OneToMany(() => BookingHistory, child => child.user)
  bookingHistorys?: BookingHistory[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
