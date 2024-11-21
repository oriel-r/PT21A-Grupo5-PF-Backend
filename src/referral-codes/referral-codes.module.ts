import { Module } from '@nestjs/common';
import { ReferralCodesService } from './referral-codes.service';
import { ReferralCodesController } from './referral-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralCode } from './entities/referral-code.entity';
import { ReferralCodesRepository } from './referral-codes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralCode])],
  controllers: [ReferralCodesController],
  providers: [ReferralCodesService, ReferralCodesRepository],
  exports: [ReferralCodesService],
})
export class ReferralCodesModule {}
