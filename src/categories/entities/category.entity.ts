import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/entities/course.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the category, auto-generated as a UUID.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the category.',
    example: 'Basic',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates whether the category is active.',
    default: true,
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    type: () => [Course],
    description: 'List of courses associated with this category.',
    example: [],
  })
  @OneToMany(() => Course, (course) => course.category, { nullable: true })
  courses: Course[];
}

