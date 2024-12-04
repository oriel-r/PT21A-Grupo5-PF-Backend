import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailerModule } from 'src/emailer/emailer.module';
import { JwtModule } from '@nestjs/jwt';
import { UserVerification } from './entities/user-verification.entity';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, UserVerification]),
    PassportModule.register({ session: true }),
    EmailerModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, AuthRepository],
})
export class AuthModule {}
