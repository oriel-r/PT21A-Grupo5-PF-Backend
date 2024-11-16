import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailerModule } from 'src/emailer/emailer.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
    EmailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
