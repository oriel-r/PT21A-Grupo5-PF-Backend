import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, Matches } from 'class-validator';

export class SignInAuthDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'alice.smith@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The password of the user',
    example: 'Alice1234$',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
})
@Matches(/[!@#$%^&*]/, { message: 'La contraseña debe contener al menos un carácter especial: !@#$%^&*' })
  password: string;

  constructor(partial: Partial<SignInAuthDto>) {
    Object.assign(this, partial);
  }
}
