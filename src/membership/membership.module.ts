import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { MembershipRepostory } from './membership.repository';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Membership, Payment, Subscription]), SubscriptionsModule, PaymentsModule],
  controllers: [MembershipController],
  providers: [MembershipService, MembershipRepostory],
  exports: [MembershipService, MembershipRepostory]
})
export class MembershipModule {}
