import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
    super({
      domain: process.env.AUTH0_DOMAIN.replace(/^https?:\/\//, ''),
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: ['openid', 'profile', 'email'],
    });

    console.log('Configuración de Auth0:', {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      callbackURL:
        process.env.CALLBACK_URL || 'http://localhost:3000/auth/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, extraParams: any, profile: any, done: Function) {
    console.log("Perfil del usuario autenticado:", profile)
    console.log(accessToken);

    const user = {
      authId: profile.id,
      email: profile.emails[0].value,
      name: profile.name,
      photo: profile.picture
    };

    let userExisting = await this.usersService.findEmail(user.email);

    if (!userExisting) {
      userExisting = await this.usersService.createUserFromAuth0(user)
    }

    const jwt = await this.jwtService.signAsync({
      email: userExisting.email,
      name: userExisting.name,
      role: userExisting.role,
    });
    
    return done(null, userExisting, {tokens: jwt});
  }
}

