import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class RateCourseDto {
  @ApiProperty({ description: 'The ID of the user rating the course'})
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The number of stars for the rating'})
  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;
}
