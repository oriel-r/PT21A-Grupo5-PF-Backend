import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUser: SignupUserDto) {
    if (signUpUser.password !== signUpUser.repeatPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    signUpUser.password = await hash(signUpUser.password, 10);

    await this.usersService.createUser(signUpUser);
    return signUpUser;
  }

  async signIn(credentials: SignInAuthDto) {
    const user = await this.userRepo.getUserByEmail(credentials.email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordMatching = await compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        idNumber: user.idNumber,
      },
    };
  }
}
