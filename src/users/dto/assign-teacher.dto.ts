import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AssignTeacherDto {
    @ApiProperty({
        type: String,
        description: 'The unique identifier of the teacher being assigned to the course.',
        example: '123e4567-e89b-12d3-a456-426614174000',
      })
    @IsString()
    @IsNotEmpty()
    teacherId:string
}