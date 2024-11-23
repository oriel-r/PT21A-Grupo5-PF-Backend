import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { EmailerService } from 'src/emailer/emailer.service';
import { SendEmailDto } from 'src/emailer/dto/send-email.dto';
import { emailHtml } from 'src/utils/email-template';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailerService,
  ) {}

  async signUp(signUpUser: SignupUserDto) {
    if (signUpUser.password !== signUpUser.repeatPassword) {
      throw new HttpException('Las contraseñas no coinciden', 400);
    }

    signUpUser.password = await hash(signUpUser.password, 10);

    const newUser = await this.usersService.createUser(signUpUser);
    const message = emailHtml.replace('{{userName}}', signUpUser.name);
    const from = 'Uniendo Culturas <no-reply@uniendoculturas.edu.ar>';
    const to = [signUpUser.email];
    const subject = 'Bienvenido a Uniendo Culturas';
    await this.emailService.sendWelcomeEmail({ from, to, subject, message });
    return newUser;
  }

  async signIn(credentials: SignInAuthDto) {
    const user = await this.userRepo.getUserByEmail(credentials.email);

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordMatching = await compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Credenciales Incorrectas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      photo: user.photo,
      memebership: user.membership,
      subscription: user.membership.subscription
    };

    const token = this.jwtService.sign(userPayload);

    console.log('This is the payload: ', userPayload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        idNumber: user.idNumber,
        role: user.role,
        photo: user.photo,
        memebership: user.membership,
        subscription: user.membership.subscription
      },
    };
  }

  generateJwt(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      photo: user.photo,
      subscription: user.membership.subscription,
      memebership: user.membership,
    }
    return this.jwtService.sign(payload);
  }
}
