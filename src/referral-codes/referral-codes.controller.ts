/* import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReferralCodesService } from './referral-codes.service';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { UpdateReferralCodeDto } from './dto/update-referral-code.dto';

@Controller('referral-codes')
export class ReferralCodesController {
  constructor(private readonly referralCodesService: ReferralCodesService) {}

  @Post()
  async create(@Body() createReferralCodeDto: CreateReferralCodeDto) {
    const { quantity, issuer, discount, expiration } = createReferralCodeDto;
    return await this.referralCodesService.create({ quantity, issuer, discount, expiration });
  }

  @Get()
  findAll() {
    return this.referralCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralCodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReferralCodeDto: UpdateReferralCodeDto) {
    return this.referralCodesService.update(+id, updateReferralCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralCodesService.remove(+id);
  }
} */
