import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class WsAuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const client = context.switchToWs().getClient(); // Obtiene el cliente WebSocket
      const token = this.extractTokenFromSocket(client);
  
      if (!token) {
        throw new UnauthorizedException('Token no encontrado.');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
  
        client.user = payload;
  
        return true;
      } catch (error) {
        throw new UnauthorizedException('Token no válido.');
      }
    }
  
    private extractTokenFromSocket(client: any): string {
      const authorizationHeader = client.handshake?.headers?.authorization;
      if (authorizationHeader?.startsWith('Bearer ')) {
        return authorizationHeader.split(' ')[1];
      }
  
      return client.handshake?.query?.token || undefined;
    }
  }