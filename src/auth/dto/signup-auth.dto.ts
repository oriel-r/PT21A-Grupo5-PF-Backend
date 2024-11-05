import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignupUserDto {
    @ApiProperty({
        type: String,
        required: true,
        example: 'John Doe',
        description: 'The name of the user',
      })
      @IsString()
      @IsNotEmpty()
      name: string;
      @ApiProperty({
        type: String,
        required: true,
        example: 'john@example.com',
        description: 'The email of the user',
      })
      @IsEmail()
      @IsNotEmpty()
      @IsString()
      email: string;
      @ApiProperty({
        type: String,
        required: true,
        description: 'The password of the user',
        example: 'Password123!',
      })
      @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&])[A-Za-z\d=!@#$%^&]{8,15}$/,
        {
          message:
            'La contraseña debe contener al menos una minúscula, una mayúscula, un número, un caracter especial (= !@#$%^&*) y tener entre 8 y 15 caracteres',
        },
      )
      @IsString()
      @IsNotEmpty()
      password: string;

      @ApiProperty({
        type: String,
        required: true,
        description: 'The password of the user',
        example: 'Password123!',
      })
      @IsString()
      @IsNotEmpty()
      repeatPassword: string;
    
      @ApiProperty({
        type: String,
        required: true,
        description: 'Personal identification number',
        example: '12345678',
      })
      @IsString()
      @IsNotEmpty()
      idNumber: string;
}
