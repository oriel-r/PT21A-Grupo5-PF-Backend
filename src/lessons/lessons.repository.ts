import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async getAll(limit: number, page: number): Promise<Lesson[]> {
    return await this.lessonsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
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
}
