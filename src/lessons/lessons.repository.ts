import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async getAll(limit: number, page: number): Promise<Lesson[]> {
    const result = await this.lessonsRepository.find({
      skip: (page * limit) - 1,
      take: page, 
      relations: {course: true}
    });
    return result
  }

  async getById(id: string): Promise<Lesson> {
    return await this.lessonsRepository.findOneBy({ id });
  }

  async create(data: Partial<Lesson>): Promise<Lesson> {
    return await this.lessonsRepository.save(
      this.lessonsRepository.create(data),
    )[0];
  }

  async updateVideo(id, url) {
    return await this.lessonsRepository.update(id, { video_url: url });
  }

  async deleteLesson(id: string): Promise<void> {
    await this.lessonsRepository.delete(id);
  }

  async save(lesson: Lesson) {
    await this.lessonsRepository.save(lesson);
  }

  async getAllLessons(
    course:Course,
    page: number,
    limit: number,
  ): Promise<{ data: Lesson[]; total: number }> {
    const queryBuilder = this.lessonsRepository.createQueryBuilder('lesson');
    queryBuilder
    .where('lesson.courseId = :courseId', { courseId: course.id })
    .skip((page - 1) * limit)
    .take(limit);
    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }
}
