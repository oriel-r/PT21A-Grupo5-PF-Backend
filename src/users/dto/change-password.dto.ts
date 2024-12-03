import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
  ValidationArguments,
} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The current password of the user.',
    example: 'OldPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The new password of the user. Must meet the strength requirements.',
    example: 'Password123!',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        'The password must be 8-15 characters long, and include at least one lowercase letter, one uppercase letter, one number, and one special character (= !@#$%^&*).',
    },
  )
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Repeat the new password. Must match newPassword.',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  repeatPassword: string;
}

