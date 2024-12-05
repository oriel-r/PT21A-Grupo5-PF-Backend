import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReferralCodesService } from './referral-codes.service';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { UpdateReferralCodeDto } from './dto/update-referral-code.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReferralCode } from './entities/referral-code.entity';
import { RedeemCodeDto } from './dto/redeem-code.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles.enum';

@ApiBearerAuth()
@Controller('referral-codes')
@ApiTags('referral-codes') // Groups routes under 'referral-codes' in Swagger
export class ReferralCodesController {
  constructor(private readonly referralCodesService: ReferralCodesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  @ApiOperation({
    summary: 'Create multiple referral codes',
    description:
      'Creates referral codes based on the specified quantity, issuer, discount, and expiration.',
  })
  @ApiResponse({
    status: 201,
    description: 'Referral codes successfully created.',
    type: ReferralCode,
    isArray: true,
  })
  async create(@Body() createReferralCodeDto: CreateReferralCodeDto) {
    const { quantity, issuer, discount, expiration } = createReferralCodeDto;
    return await this.referralCodesService.create({
      quantity,
      issuer,
      discount,
      expiration,
    });
  }

  @ApiOperation({
    summary: 'redeem referral codes',
    description:
      'Redeemsreferral codes based on the specified quantity, issuer, discount, and expiration.',
  })
  @ApiResponse({
    status: 201,
    description: 'Referral codes successfully created.',
  })
  @UseGuards(AuthGuard)
  @Post('redeem/:id')
  async redeem(@Param('id') userId: string, @Body() code: string) {
    const data = new RedeemCodeDto(userId, code);
    return await this.referralCodesService.redeemCode(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'Get all referral codes',
    description: 'Retrieves a list of all referral codes in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of referral codes.',
    type: ReferralCode,
    isArray: true,
  })
  async findAll() {
    return await this.referralCodesService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOperation({
    summary: 'Get a referral code by ID',
    description:
      'Retrieves the details of a referral code specified by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the referral code.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the specified referral code.',
    type: ReferralCode,
  })
  @ApiResponse({
    status: 404,
    description: 'Referral code not found.',
  })
  findOne(@Param('id') id: string) {
    return this.referralCodesService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a referral code',
    description: 'Updates the details of an existing referral code.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the referral code to update.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Referral code successfully updated.',
    type: ReferralCode,
  })
  @ApiResponse({
    status: 404,
    description: 'Referral code not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateReferralCodeDto: UpdateReferralCodeDto,
  ) {
    return this.referralCodesService.update(id, updateReferralCodeDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a referral code',
    description: 'Removes the specified referral code from the system.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the referral code to delete.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Referral code successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Referral code not found.',
  })
  remove(@Param('id') id: string) {
    return this.referralCodesService.remove(id);
  }
}
