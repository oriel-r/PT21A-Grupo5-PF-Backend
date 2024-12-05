import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { UpdateMembershipDto } from './dto/update-membership-request.dto';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return await this.membershipService.getMemberships();
  }

  @ApiParam({
    name: 'id',
    description: 'membership id',
  })
  @ApiBody({
    description: 'name of the subscription and data for mercadopago',
    type: UpdateMembershipDto,
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateMembership(
    @Param('id') id: string,
    @Body() data: UpdateMembershipDto,
  ) {
    return await this.membershipService.updateMembership(id, data);
  }
}
