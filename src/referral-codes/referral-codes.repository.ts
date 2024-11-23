/* import { InjectRepository } from '@nestjs/typeorm';
import { ReferralCode } from './entities/referral-code.entity';
import { Repository } from 'typeorm';

export class ReferralCodesRepository {
  constructor(
    @InjectRepository(ReferralCode)
    private readonly referralCodesRepository: Repository<ReferralCode>,
  ) {}

  async save(referralCode: ReferralCode) {
    await this.referralCodesRepository.save(referralCode);
  }
} */
