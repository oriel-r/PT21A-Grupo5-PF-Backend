import { ApiProperty } from '@nestjs/swagger';
import { Membership } from 'src/membership/entities/membership.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Payment {
  @ApiProperty({
    name: 'id',
    description: 'An id for payment registred',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    name: 'membership',
    description: 'payment from membership',
  })
  @ManyToOne(() => Membership, (membership) => membership.payments)
  @JoinColumn()
  membership: Membership;

  @ApiProperty({
    name: 'date',
    description: "payment's date",
  })
  @Column({default: new Date()})
  date: Date;Z
  
  @ApiProperty({
    name: 'status',
    description: 'payment status, autosigned in payment create process',
    example: 'pending'
  })
  @Column({ nullable: true })
  status: string;

  @ApiProperty({name: 'amount', description: 'amount of transaction'})
  @Column({nullable: true, type: 'decimal', scale: 2, precision: 10})
  amount: number
}
