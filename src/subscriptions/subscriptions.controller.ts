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
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createSubscriptionDto);
  }

  //@Roles(Role.ADMIN)
  //@UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.subscriptionsService.findAll();
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subscriptionsService.findOne(id);
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subscriptionsService.remove(id);
  }
}
