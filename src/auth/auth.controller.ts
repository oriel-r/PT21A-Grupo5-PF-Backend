import { Body, Controller, Get, HttpCode, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseAuthDto } from './dto/user-response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

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

  /*  @Get('/callback')
   async handleAuthCallback(@Req() request, @Res() response) {
     const userData = request.oidc.user; 
     
     let user = await this.usersService.findEmail(userData.email);
 
     if (!user) {
       await this.usersService.createUserFromAuth0({
       authId: userData.sub,
       email: userData.email,
       name: userData.name,
       isProfileComplete: false,
     });
   }
 
     if(!user.isProfileComplete){
       return response.redirect('/profile/commplete')
     }
 
     return response.redirect('/');
   }
 
   @Post('/profile/complete')
   async saveAdditionalInfo(@Body() formData: { idNumber: string; photo: string }, @Req() request) {
     const token = request.oidc.idToken
     const userId = request.oidc.user.sub;
 
     const userCompleted = await this.usersService.updateUserAuth0(userId, {
       idNumber: formData.idNumber,
       photo: formData.photo,
       isProfileComplete: true, 
     });
 
     return {token, userCompleted };
   } */

  @Get('login')
  @UseGuards(AuthGuard('auth0')) // Esto usa la estrategia de passport-auth0
  login() {
    // Si llegamos aquí, significa que la autenticación fue exitosa
    return { message: 'Login exitoso' };
  }

  @Get('callback')
  @UseGuards(AuthGuard('auth0')) // Usar el guard de Passport para Auth0
  async callback(@Req() req, @Res() res) {
    // Si la autenticación es exitosa, req.user contendrá los datos del usuario
    console.log('Datos del usuario:', req.user);

    // Redirigir o devolver la información del usuario
    return res.json({ message: 'Login exitoso', user: req.user });
  }

  @Get('logout')
  logout(@Req() req, @Res() res): void {
    console.log('Iniciando logout');

    // 1. Eliminar la sesión local
    req.logout((err) => {
      if (err) {
        console.error('Error al cerrar sesión local:', err);
        return res.status(500).json({ message: 'Error al cerrar sesión local', error: err });
      }
      console.log('Sesión local cerrada con éxito');

      // 2. Redirigir a Auth0 para cerrar la sesión en su plataforma
      const logoutURL = `${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent('http://localhost:3000')}&client_id=${process.env.AUTH0_CLIENT_ID}`;
      console.log('Redirigiendo a Auth0 logoutURL:', logoutURL);

      // Redirigir a Auth0 para que cierre sesión en su plataforma
      res.redirect(logoutURL);
    });
  }
}
