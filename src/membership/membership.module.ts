import { forwardRef, Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { MembershipRepostory } from './membership.repository';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { MercadopagoService } from 'src/services/mercadopago/mercadopago.service';
import { ReferralCodesModule } from 'src/referral-codes/referral-codes.module';
import { ReferralCode } from 'src/referral-codes/entities/referral-code.entity';
import { ReferralCodesService } from 'src/referral-codes/referral-codes.service';
import { ReferralCodesRepository } from 'src/referral-codes/referral-codes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Membership, Payment, Subscription]), SubscriptionsModule, PaymentsModule],
  controllers: [MembershipController],
  providers: [MercadopagoService, MembershipService, MembershipRepostory],
  exports: [MembershipService, MembershipRepostory]
})
export class MembershipModule {}
