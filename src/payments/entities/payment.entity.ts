import { ApiProperty } from "@nestjs/swagger";
import { Subscription } from "src/subscriptions/entities/subscription.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity()
export class Payment {
    @ApiProperty({
        name: 'id',
        description: 'An id for payment registred'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty({
        name: 'User',
        description: "payment's user"
    })
    @ManyToOne(() => User, (user) => user.payments)
    @JoinColumn()
    user: User

    @ManyToOne(() => Subscription, (subscription) => subscription.payments)
    @JoinColumn()
    subscription: Subscription

    @Column({nullable: true})
    status: string
}