import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionsRepository } from './subscriptions.repository';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { name, description, price } = createSubscriptionDto;
    return await this.subscriptionsRepository.create({
      name,
      description,
      price,
    });
  }

  async findAll() {
    return await this.subscriptionsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.subscriptionsRepository.findOne(id);
  }

  async findByName(name: string) {
    return await this.subscriptionsRepository.findByName(name);
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.subscriptionsRepository.update(id, updateSubscriptionDto);
  }

  async remove(id: string) {
    return await this.subscriptionsRepository.delete(id);
  }
}
