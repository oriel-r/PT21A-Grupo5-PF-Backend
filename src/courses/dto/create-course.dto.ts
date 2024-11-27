import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Level } from 'src/enums/level.enum';
import { Specialization } from 'src/enums/specializations.enum';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { DeepPartial } from 'typeorm';

export class CreateCourseDto {
  @ApiProperty({
    name: 'title',
    type: 'string',
    description: "Course's title",
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiProperty({
    name: 'lessons',
    description: "Course's lessons",
    nullable: true,
  })
  @IsOptional()
  lessons: Lesson[];

  @ApiProperty({
    name: 'language',
    description: 'course about language',
  })
  @IsNotEmpty()
  @IsString()
  language: string;

  
  @ApiProperty({
    description: 'The specialization of the course.',
    enum: Specialization,
    example: Specialization.CONVERSATIONAL,
  })
  @IsOptional()
  @IsEnum(Specialization)
  specialization: Specialization;

  @ApiProperty({
    description: 'The difficulty level of the course.',
    enum: Level,
    example: Level.ELEMENTARY,
  })
  @IsOptional()
  @IsEnum(Level)
  level: Level;

  @ApiProperty({
    description: 'A detailed description of the course.',
    example: 'This course covers the fundamentals of programming...',
  })
  @IsOptional()
  @IsString()
  general_description: string;

  @ApiProperty({
    description: 'A short description of the course.',
    example: 'Learn the basics of programming in just 30 days.',
  })
  @IsOptional()
  @IsString()
  brief_description: string;

  constructor(partial: DeepPartial<CreateCourseDto>) {
    Object.assign(this, partial);
  }
}
