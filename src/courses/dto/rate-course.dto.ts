import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min, Max } from 'class-validator';

export class RateCourseDto {
  @ApiProperty({
    description: 'The ID of the user rating the course.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The number of stars for the rating.',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;
}
