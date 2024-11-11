import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Repository, In } from 'typeorm';
import { lessonsMock } from './lessons-mock';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class LessonsSeeds {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async seed() {
    try {
      for (const lesson of lessonsMock) {
        const existCourse = await this.courseRepository.findOneBy({
          title: lesson.course,
        });
        if (existCourse) {
          const { course, ...others } = lesson;
          const lessonSeed: Partial<Lesson> = {
            ...others,
            course: existCourse,
          };
          await this.lessonsRepository.save(
            this.lessonsRepository.create(lessonSeed),
          );
        }
      }

      console.log('lessons added from seeds');
    } catch (error) {
      console.log(error);
    }
  }
}
