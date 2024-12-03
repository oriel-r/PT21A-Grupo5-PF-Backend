import { Membership } from 'src/membership/entities/membership.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';  // Importing ApiProperty from NestJS Swagger
import { v4 as uuid } from 'uuid';

@Entity()
export class Subscription {
  @ApiProperty({
    description: 'The unique identifier of the subscription.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the subscription plan (e.g., Basic, Premium).',
    example: 'Premium',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'A list of descriptions for the subscription plan.',
    example: ['Access to premium courses', 'Priority support'],
    type: [String],  // Explicitly define type as an array of strings
  })
  @Column('text', { array: true })
  description: string[];

  @ApiProperty({
    description: 'The price of the subscription plan.',
    example: 29.99,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'A list of memberships associated with this subscription.',
    type: () => Membership,  // Link to the Membership entity
    isArray: true,
  })
  @OneToMany(() => Membership, (membership) => membership.subscription)
  memberships: Membership[];
}

