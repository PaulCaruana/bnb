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

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  message: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.contacts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  accommodationId: string

  @ManyToOne(() => Accommodation, parent => parent.contacts)
  @JoinColumn({ name: 'accommodationId' })
  accommodation?: Accommodation

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
