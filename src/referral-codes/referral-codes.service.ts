import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { UpdateReferralCodeDto } from './dto/update-referral-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralCode } from './entities/referral-code.entity';
import { ReferralCodesRepository } from './referral-codes.repository';
import { UsersService } from 'src/users/users.service';
import { addDays, compareAsc } from 'date-fns';
import { Repository } from 'typeorm';
import * as randomstring from 'randomstring';
import { RedeemCodeDto } from './dto/redeem-code.dto';


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
      (codeNumber) =>
        new ReferralCode({
          code: codeNumber,
          issuer: user,
          discount: discount,
          issuedAt: createdAt,
          expirationDate: expirationDate,
        }),
    );

    await this.referralCodesRepository.save(referralCodeEntitites);

    return referralCodeEntitites;
  }

  async redeemCode(userId:string, codeDto:RedeemCodeDto):Promise<ReferralCode> {
    const {code} = codeDto
    const referralCode = await this.referralCodesRepository.findOne({where:{code}})
    const redeemer = await this.usersService.findOne(userId)
    const isExpired =  (compareAsc(referralCode.expirationDate, new Date())) === -1
    if (!referralCode) {
      throw new BadRequestException('Código inválido');
    }
    if (isExpired) {
      throw new BadRequestException('El código ha expirado.');
    }
    if (referralCode.redeemed) {
      throw new BadRequestException('El código ya fue redimido.');
    }
    if (redeemer.redeemedReferralCode) {
      throw new UnauthorizedException('No se puede usar más de un código de descuento.');
    }

    referralCode.redeemed = true
    referralCode.redeemer = redeemer
    await this.referralCodesRepository.save(referralCode)
    return referralCode

  }

  async findAll() {
    return await this.referralCodesRepository.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} referralCode`;
  }

  update(id: string, updateReferralCodeDto: UpdateReferralCodeDto) {
    return `This action updates a #${id} referralCode`;
  }

  remove(id: string) {
    return `This action removes a #${id} referralCode`;
  }


  generateReferralCodes(count: number, length: number): string[] {
    return Array.from({ length: count }, () =>
      randomstring.generate({ length, charset: 'alphanumeric' }),
    );
  }
}
