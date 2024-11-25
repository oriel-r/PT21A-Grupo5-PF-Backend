import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
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
import { ReferralCodesService } from 'src/referral-codes/referral-codes.service';

@Injectable()
export class MembershipService {
  constructor(
    private readonly membershipsRepository: MembershipRepostory,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly paymentsServicec: PaymentsService,
    private readonly externalPayment: MercadopagoService,
    //private readonly referralCodesService: ReferralCodesService
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
    const membership = await this.membershipsRepository.getById(id);
    if (!membership)
      throw new NotFoundException('No se encontro la memebresia');
    const newSubs = await this.subscriptionsService.findOne(updateData.subs_id);
    if (!newSubs)
      throw new NotFoundException(
        'No se encontraron subscripciones asignables',
      );
    if(membership.subscription.id === newSubs.id) throw new BadRequestException('El plan seleccionado coincide con tu plan actual')
    const mpResponse: PreApprovalResponse = await this.externalPayment.createSubscription(new MyPreApproval(membership, newSubs))
    console.log({memService: mpResponse})
    const firstPayment = await this.paymentsServicec.addPayment({
      membership: membership,
    });
    if (!firstPayment)
      throw new ServiceUnavailableException(
        'Hubo un error al procesar el pago',
      );
    await this.membershipsRepository.updateMembership(membership.id, {
      subscription: newSubs,
    });
    if(mpResponse && mpResponse.init_point) return {link: mpResponse.init_point}
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
