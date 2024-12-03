import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class EnrollStudentDto {
  @ApiProperty({
    type: String,
    description: 'ID of the course the student is enrolling in.',
    example: 'e8c51d26-1b0d-4b12-9c67-2f4d9a0b2c5f', // Example UUID
  })
  @IsUUID()
  courseId: string;
}

