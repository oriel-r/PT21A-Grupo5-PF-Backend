import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { MembershipRepostory } from './membership.repository';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { PaymentsService } from 'src/payments/payments.service';
import { User } from 'src/users/entities/user.entity';
import { Membership } from './entities/membership.entity';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MercadopagoService } from 'src/services/mercadopago/mercadopago.service';
import { PreApprovalResponse } from 'mercadopago/dist/clients/preApproval/commonTypes';
import { MyPreApproval } from './dto/create-memebership.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RedeemCodeDto } from 'src/referral-codes/dto/redeem-code.dto';
import { ReferralCode } from 'src/referral-codes/entities/referral-code.entity';

@Injectable()
export class MembershipService {
  constructor(
    private readonly membershipsRepository: MembershipRepostory,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly paymentsServicec: PaymentsService,
    private readonly externalPayment: MercadopagoService,
    private readonly eventEmiter: EventEmitter2
  ) {}

  async createMembership(user: User): Promise<Membership> {
    const subscription = await this.subscriptionsService.findByName('Standard');
    if (!subscription)
      throw new NotFoundException(
        'No se encontraron subscripciones asignables',
      );
    const membership = await this.membershipsRepository.create({
      user,
      subscription,
    });
    return membership;
  }

  async updateMembership(id: string, updateData: UpdateMembershipDto) {
    let checkedReferral: ReferralCode[] = [];
    
    const membership = await this.membershipsRepository.getById(id);
    if (!membership) {
      throw new NotFoundException('No se encontró la membresía');
    }
  
    const newSubscription = await this.subscriptionsService.findOne(updateData.subs_id);
    if (!newSubscription) {
      throw new NotFoundException('No se encontraron suscripciones asignables');
    }
  
    if (membership.subscription.id === newSubscription.id) {
      throw new BadRequestException('El plan seleccionado coincide con tu plan actual');
    }
  
    if (updateData.vaucher) {
      checkedReferral = await this.eventEmiter.emitAsync(
        'checkReferral',
        new RedeemCodeDto(membership.user.id, updateData.vaucher)
      );
    }
  
    const discount = checkedReferral.length > 0 ? checkedReferral[0].discount : 0;
    
    const mpSubs = new MyPreApproval(membership, newSubscription, discount)
    console.log(mpSubs)

    const mpResponse: PreApprovalResponse = await this.externalPayment.createSubscription(mpSubs);
    console.log(mpResponse)
    if (!mpResponse || !mpResponse.init_point) {
      throw new ServiceUnavailableException('Error al procesar la suscripción externa');
    }
    

    const firstPayment = await this.paymentsServicec.addPayment({ membership });
    if (!firstPayment) {
      throw new ServiceUnavailableException('Hubo un error al procesar el pago');
    }
  
    await this.membershipsRepository.updateMembership(membership.id, {
    } );
  
    return { link: mpResponse.init_point };
  }

  async getMemberships() {
    const result = await this.membershipsRepository.getAll();
    if (!result) throw new NotFoundException('No se encontraron membresias');
    return result;
  }

  async saveMembership(membership:Membership):Promise<void> {
    await this.membershipsRepository.save(membership)
  }
}
