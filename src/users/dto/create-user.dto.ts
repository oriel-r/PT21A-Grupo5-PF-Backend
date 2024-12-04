import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user.',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Personal identification number (e.g., government ID).',
    example: '12345678',
  })
  @IsString()
  idNumber: string;

  @ApiProperty({
    description:
      'The password for the user. Defaults to "Teacher1234!" if not provided.',
    default: 'Teacher1234!',
    example: 'Teacher1234!',
  })
  @IsOptional()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      'Password must be at least 8 characters long, include one uppercase letter and one number.',
  })
  password?: string;

  @ApiProperty({
    enum: Role,
    description: 'The role assigned to the user.',
    default: Role.TEACHER,
    example: Role.TEACHER,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    description: 'URL for the user profile image.',
    default:
      'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
    example: 'https://example.com/images/profile.jpg',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({
    description: 'Indicates whether the user is subscribed to the newsletter.',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @ApiProperty({
    description: 'Indicates whether the user account is active.',
    default: true,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
