import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    type: Array<string>,
    title: 'To',
    description: 'Email recepients',
    example: ['user1@example.com', 'user2@example.com'],
  })
  @IsString({ each: true })
  @IsNotEmpty()
  to: Array<string>;
  @ApiProperty({
    type: String,
    title: 'Subject',
    description: 'Email subject',
    example: 'Apertura de nuevos cursos.',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;
  @ApiProperty({
    type: String,
    title: 'Message',
    description: 'Body of the email',
    example: 'Te presentamos nuestros nuevos cursos.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
