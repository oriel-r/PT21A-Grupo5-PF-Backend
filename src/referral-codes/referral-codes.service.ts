import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { UpdateReferralCodeDto } from './dto/update-referral-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralCode } from './entities/referral-code.entity';
import { ReferralCodesRepository } from './referral-codes.repository';
import { UsersService } from 'src/users/users.service';
import { addDays } from 'date-fns';
import { Repository } from 'typeorm';
import * as randomstring from 'randomstring';


@Injectable()
export class ReferralCodesService {
  constructor(
    @InjectRepository(ReferralCode)
    private readonly referralCodesRepository: Repository<ReferralCode>,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createReferralCodeDto: CreateReferralCodeDto,
  ):Promise<ReferralCode[]> {
    const { quantity, issuer, discount, expiration } = createReferralCodeDto;
    const user = await this.usersService.findOne(issuer);
    if (user.role !== 'admin') {
      throw new UnauthorizedException('Usuario no autorizado a crear códigos.');
    }

    const codes = this.generateReferralCodes(quantity, 5);

    const createdAt = new Date();
    const expirationDate = addDays(createdAt, expiration);

    const referralCodeEntitites = codes.map(
      (codeNumer) =>
        new ReferralCode({
          code: codeNumer,
          issuer: user,
          discount: discount,
          issuedAt: createdAt,
          expirationDate: expirationDate,
        }),
    );

    await this.referralCodesRepository.save(referralCodeEntitites);

    return referralCodeEntitites;
 
    
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


  generateReferralCodes(count: number, length: number): string[] {
    return Array.from({ length: count }, () =>
      randomstring.generate({ length, charset: 'alphanumeric' }),
    );
  }
}
