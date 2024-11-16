import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { MembershipRepostory } from './membership.repository';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { PaymentsService } from 'src/payments/payments.service';
import { User } from 'src/users/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Membership } from './entities/membership.entity';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MercadopagoService } from 'src/services/mercadopago/mercadopago.service';

@Injectable()
export class MembershipService {
    constructor(
        private readonly membershipsRepository: MembershipRepostory,
        private readonly subscriptionsService: SubscriptionsService,
        private readonly paymentsServicec: PaymentsService,
        private readonly externalPayment: MercadopagoService
    ) {}

    async createMembership(user: User): Promise<Membership[]> {
        const subscription = await this.subscriptionsService.findByName('standard')
        if(!subscription) throw new NotFoundException('No se encontraron subscripciones asignables')
        const membership = await this.membershipsRepository.create({user, subscription})
        return membership
    } 

    async updateMembership(updateData: UpdateMembershipDto) {
        const membership = await this.membershipsRepository.getById(updateData.id)
        if(!membership) throw new NotFoundException('No se encontro la memebresia')
        const newSubs = await this.subscriptionsService.findByName(updateData.name)
        if(!newSubs) throw new NotFoundException('No se encontraron subscripciones asignables')
        //const data = await this.externalPayment.createSubscription(updateData.data)
        const firstPayment = await this.paymentsServicec.addPayment({membership: membership})
        if(!firstPayment) throw new ServiceUnavailableException('Hubo un error al procesar el pago')
        return await this.membershipsRepository.updateMembership(membership.id, {subscription: newSubs})
        
    }

    async getMemberships() {
        const result = await this.membershipsRepository.getAll()
        if(!result) throw new NotFoundException('No se encontraron membresias')
            return result
    }
} 
