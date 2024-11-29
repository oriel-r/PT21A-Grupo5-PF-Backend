import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/entities/course.entity';
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity()
export class Lesson {
  @ApiProperty({
    name: 'id',
    description: 'Autogenered UUID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    name: 'title',
    description: "Lesson's title",
    type: 'string',
    example: 'Clase 1: Introducción al guarani',
  })
  @Column()
  title: string;

  @ApiProperty({
    name: 'content',
    description: "Lesson's content",
    type: 'string',
    example:
      'El guarani es la segunda lengua de Paraguya y también es habalda en el noreste argentino...',
  })
  @Column()
  content: string;

  @ApiProperty({
    name: 'video',
    description:
      "Lesson's video. Only use for document this api. Validation by file-upload pipe and upload externaly",
  })
  @Column({
    default: 'https://res.cloudinary.com/drhgd3e7s/video/upload/v1732670241/kitten_fbh01u.mp4',
  })
  video_url: string;

  @ApiProperty({
    name: 'Estado',
    description: 'Indicates if the lesson is active or not',
  })
  @Column({default:true})
  isActive: boolean;

  @ApiProperty({
    name: 'course',
    description: 'lesson from course',
  })
  @ManyToOne(() => Course, (course) => course.lessons)
  @JoinColumn()
  course: Course;

  constructor(partial: DeepPartial<Lesson>) {
    Object.assign(this, partial);
  }
}
