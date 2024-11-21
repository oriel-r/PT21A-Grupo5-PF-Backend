import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseAuthDto } from './dto/user-response-auth.dto';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() signUpUser: SignupUserDto) {
    const newUser = await this.authService.signUp(signUpUser);
    return new UserResponseAuthDto(newUser);
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() credentials: SignInAuthDto) {
    return await this.authService.signIn(credentials);
  }

  @Get('login')
  @UseGuards(AuthGuard('auth0'))
  login() {
    return { message: 'Login exitoso' };
  }

  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  async callback(@Req() req: Request, @Res() res) {}

  @Get('logout')
  async logout(@Req() req, @Res() res): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        req.logout((err) => {
          if (err) {
            console.error('Error al cerrar sesión local:', err);
            return reject(
              new HttpException(
                'Error al cerrar sesión local',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
          resolve();
        });
      });

      const logoutURL = `${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent(process.env.AUTH0_BASE_URL)}&client_id=${process.env.AUTH0_CLIENT_ID}`;

      res.redirect(logoutURL);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      res.status(error.status || 500).json({
        messaje: error.message || 'Error desconocido al cerrar sesión',
      });
    }
  }
}
