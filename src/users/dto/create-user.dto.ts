import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsBoolean, IsEnum, Matches, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the user.' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Personal identification number.' })
  @IsString()
  idNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The password of the user',
    example: 'Password123!',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número, un caracter especial (= !@#$%^&*) y tener entre 8 y 15 caracteres',
    },
  )
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Role, description: 'Enum indicating the user role.' })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    description: 'URL for the user profile image.',
    default:
      'https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({ description: 'Indicates newsletter subscription.' })
  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;

  @ApiProperty({ description: 'Indicates whether the user account is active.' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
