import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, SubscriptionsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
