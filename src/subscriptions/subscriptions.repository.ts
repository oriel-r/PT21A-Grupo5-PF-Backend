import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
  ) {}

  async findAll() {
    return await this.subscriptionsRepository.find({relations:{memberships:true}});
  }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsRepository.save(
      this.subscriptionsRepository.create(createSubscriptionDto),
    );
  }

  async findOne(id: string) {
    const subscription = await this.subscriptionsRepository.findOne({ where:{id}, relations:{memberships:true} });
    if (!subscription) {
      throw new BadRequestException('Susbscription not found');
    }
    return subscription;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id },
    });
    if (!subscription) {
      throw new BadRequestException('Susbscription not found');
    }
    return await this.subscriptionsRepository.update(
      subscription.id,
      updateSubscriptionDto,
    );
  }

  async delete(id: string) {
    const subscriptionToDelete = await this.subscriptionsRepository.findOne({
      where: { id },
    });
    if (!subscriptionToDelete) {
      throw new BadRequestException('Susbscription not found');
    }
    await this.subscriptionsRepository.delete(subscriptionToDelete.id);
    return subscriptionToDelete.id;
  }

  async findByName(name: string) {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { name },
    });

    return subscription;
  }
}
