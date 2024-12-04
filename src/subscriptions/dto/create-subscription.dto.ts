import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    type: String,
    description: 'The name of the subscription plan (e.g., Basic, Premium).',
    example: 'Basic',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: Array<string>,
    description: 'An array with bullet points of subscription characteristics.',
    example: [
      'Acceso a dos cursos (Categoría Basic)',
      'Acceso a cursos On-Demand',
      'No recibe certificado',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  description: Array<string>;
  @ApiProperty({ type: Number, description: 'Subscription price', example: 9 })
  @IsNumber()
  price: number;
}
