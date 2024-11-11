import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { In, Repository } from 'typeorm';
import { subscriptionsMock } from './subscriptions-mock';

@Injectable()
export class SubscriptionsSeeds {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
  ) {}

  async seed() {
    try {
      const existingSubscription = await this.subscriptionsRepository.find({
        where: { name: In(subscriptionsMock) },
      });

      for (const subscriptionData of subscriptionsMock) {
        if (
          !existingSubscription.some(
            (subscription) => subscription.name === subscriptionData.name,
          )
        ) {
          const subscription = new Subscription();
          subscription.name = subscriptionData.name;
          subscription.description = subscriptionData.description;
          subscription.price = subscriptionData.price;
          await this.subscriptionsRepository.save(subscription);
        }
      }
      console.log('Subscriptions injection completed.');
    } catch (error) {}
  }
}
