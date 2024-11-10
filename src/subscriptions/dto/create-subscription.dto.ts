import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    type: String,
    description: 'subscription name',
    example: 'Basic',
  })
  name: string;
  @ApiProperty({type:Array<string>,
    description:'An array with bullet points of subscription characteristics.',
    example: [
        'Acceso a dos cursos (Categoría Basic)',
        'Acceso a cursos On-Demand',
        'No recibe certificado',
      ]
  })
  description: Array<string>;
  @ApiProperty({type:Number,
    description:'Subscription price',
    example: 9
  })
  price: number;
}
