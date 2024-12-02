import { Membership } from 'src/membership/entities/membership.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { array: true })
  description: string[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Membership, (membership) => membership.subscription)
  memberships: Membership[];


}
