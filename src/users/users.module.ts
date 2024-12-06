import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { MembershipModule } from 'src/membership/membership.module';
import { CoursesModule } from 'src/courses/courses.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, forwardRef(() => MembershipModule), SubscriptionsModule, forwardRef(() => CoursesModule), CloudinaryService],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
