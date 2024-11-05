import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
  password: string;

  constructor(partial: Partial<SignInAuthDto>) {
    Object.assign(this, partial);
  }
}
