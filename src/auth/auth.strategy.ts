import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth0') {
    constructor() {
        super({
            domain: process.env.AUTH0_DOMAIN.replace(/^https?:\/\//, ''),
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: process.env.AUTH0_CALLBACK_URL,
            scope: ["openid", "profile", "email"],
        });

        console.log('Configuración de Auth0:', {
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/callback",
        });
    }

    validate(accessToken: string, refreshToken: string, extraParams: any, profile: any, done: Function) {
        console.log("Perfil del usuario autenticado:", profile)
        return done(null, profile);
    }
}