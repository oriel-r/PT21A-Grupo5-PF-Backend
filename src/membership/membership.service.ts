import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipRepostory } from './membership.repository';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { PaymentsService } from 'src/payments/payments.service';
import { User } from 'src/users/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Injectable()
export class MembershipService {
    constructor(
        private readonly membershipsRepository: MembershipRepostory,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly paymentsServicec: PaymentsService
    ) {}

    async createMembership(user: User) {
        const subscription = await this.subscriptionsService.findByName('standard')
        if(!subscription) throw new NotFoundException('No se encontraron subscripciones asignables')
        const membership = this.membershipsRepository.create({user, subscription})
        return membership
    } 

    async updateMembership(id: string, subscriptionId: string, payData) {
        const membership = await this.membershipsRepository.getById(id)
        if(!membership) throw new NotFoundException('No se encontro la memebresia')
        const newSubs = await this.subscriptionsService.findOne(id)
        if(!newSubs) throw new NotFoundException('No se encontraron subscripciones asignables')
        const firstPayment = await this.paymentsServicec.addPayment({membership, newSubs})
        membership.payments.push(firstPayment)
        membership.subscription = newSubs
        await this.membershipsRepository.updateMembership(membership.id, membership)
    }   
} 
