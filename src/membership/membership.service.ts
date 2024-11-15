import { Injectable } from '@nestjs/common';
import { MembershipRepostory } from './membership.repository';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { PaymentsService } from 'src/payments/payments.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MembershipService {
    constructor(
        private readonly membershipsRepository: MembershipRepostory,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly paymentsServicec: PaymentsService
    ) {}

    async createMembership(user: User) {
        const subscription = await this.subscriptionsService.findByName('standard')
        
    } 

} 
