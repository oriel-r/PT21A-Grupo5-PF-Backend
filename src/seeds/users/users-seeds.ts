import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { usersMock } from './users-mock';
import { hash } from 'bcrypt';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Membership } from 'src/membership/entities/membership.entity';

@Injectable()
export class UsersSeed {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Membership)
    private readonly membershipsRepository: Repository<Membership>,
  ) {}

  async findSubscriptionByName(name: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { name },
    });
    if (!subscription) {
      throw new Error(`Subscription with name "${name}" not found`);
    }
    return subscription;
  }

  async seed() {
    try {
      for (const userData of usersMock) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: userData.email },
        });

        if (!existingUser) {
          // Hash password
          const hashedPassword = await hash(userData.password, 10);

          // Create new user
          const user = new User();
          user.name = userData.name;
          user.email = userData.email;
          user.password = hashedPassword;
          user.idNumber = userData.idNumber;
          user.role = userData.role;
          user.createdAt = new Date();
          user.isActive = true;
          user.isVerified = true;

          // Assign subscription and membership for regular users
          if (user.role === 'user') {
            user.membership = await this.membershipsRepository.save(
              this.membershipsRepository.create({
                user,
                subscription: await this.findSubscriptionByName(
                  userData.subscription,
                ),
              }),
            );
          }

          // Save the user
          await this.usersRepository.save(user);
        }
      }

      console.log('Users injection completed');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  }
}
