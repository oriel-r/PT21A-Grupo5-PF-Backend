import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { UpdateMembershipDto } from './dto/update-membership-request.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  async getAll() {
    return await this.membershipService.getMemberships()
  }

  @ApiParam({
    name: 'id',
    description: 'membership id'
  })
  @ApiBody({
    description: 'name of the subscription and data for mercadopago',
    type: UpdateMembershipDto
  })
  @Put(':id')
  async updateMembership(
    @Param('id') id: string,
    @Body() data: UpdateMembershipDto) {
    return await this.membershipService.updateMembership(id, data)
  }
}
