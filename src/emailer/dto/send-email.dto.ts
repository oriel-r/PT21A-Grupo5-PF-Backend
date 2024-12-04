import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    type: [String], // Simplified type declaration for Swagger
    title: 'Recipients',
    description: 'List of email addresses to send the email to',
    example: ['user1@example.com', 'user2@example.com'],
  })
  @IsArray() // Ensures the field is an array
  @IsEmail({}, { each: true }) // Validates each string in the array is an email
  @IsNotEmpty()
  to: string[];

  @ApiProperty({
    type: String,
    title: 'Subject',
    description: 'Subject of the email',
    example: 'Apertura de nuevos cursos.',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    type: String,
    title: 'Message',
    description: 'Content of the email',
    example: 'Te presentamos nuestros nuevos cursos.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
