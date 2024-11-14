import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Current password',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty({
    type: String,
    required: true,
    description: 'The new password of the user',
    example: 'Password123!',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número, un caracter especial (= !@#$%^&*) y tener entre 8 y 15 caracteres',
    },
  )
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty({
    type: String,
    required: true,
    description: 'The new password of the user',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  repeatPassword: string;
}
