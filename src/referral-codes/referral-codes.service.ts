import { Injectable } from '@nestjs/common';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { UpdateReferralCodeDto } from './dto/update-referral-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralCode } from './entities/referral-code.entity';
import { ReferralCodesRepository } from './referral-codes.repository';

@Injectable()
export class ReferralCodesService {
  constructor(private readonly referralCodesRepository:ReferralCodesRepository) {}
  async create(createReferralCodeDto: CreateReferralCodeDto) {
    return 'This action adds a new referralCode';
  }

  findAll() {
    return `This action returns all referralCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referralCode`;
  }

  update(id: number, updateReferralCodeDto: UpdateReferralCodeDto) {
    return `This action updates a #${id} referralCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} referralCode`;
  }
}
