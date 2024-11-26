import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { defaultImage } from './link.const';
import { Course } from 'src/courses/entities/course.entity';

@Entity({name: 'languages'})
export class Language {
  @ApiProperty({
    description: 'Autogeneretad UUID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'atribute for get a language',
    example: 'Guarani',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  path: string;

  @ApiProperty({
    description: 'the name of language for render views',
    example: 'Guarani',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    name: 'image_url',
    description: 'A reference image of the language',
    type: 'string',
  })
  @Column({ default: defaultImage })
  image_url: string;

  @ApiProperty({
    name: 'flag_url',
    description: 'A reference image of the flag',
    type: 'string',
  })
  @Column({nullable:true})
  flag_url: string;

  @ApiProperty({
    name: 'country_photo',
    description: 'a photo from a city or place in this country',
    type: 'string',
  })
  @Column({ default: defaultImage })
  country_photo_url: string;

  @ApiProperty({
    name: 'general_description',
    description: 'A description',
  })
  @Column()
  general_description: string;

  @ApiProperty({
    name: 'brief_description',
    description: 'A short description',
  })
  @Column()
  brief_description: string;

  @OneToMany(() => Course, (course) => course.language, { cascade: true })
  courses: Course[];
}
