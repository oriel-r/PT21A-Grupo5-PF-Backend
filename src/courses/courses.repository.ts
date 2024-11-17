import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async getAllCourses(): Promise<Course[]> {
    return await this.coursesRepository.find({
      relations: { lessons: true, users: true, language: true },
    });
  }

  async findByTitle(title: string): Promise<Course | null> {
    return await this.coursesRepository.findOne({
      where: { title },
      relations: { lessons: true, users: true, language: true },
    });
  }

  async createCourse(data): Promise<Course[]> {
    return await this.coursesRepository.save(
      this.coursesRepository.create(data),
    );
  }

  async findById(id: string): Promise<Course> {
    return await this.coursesRepository.findOne({
      where: { id },
      relations: { lessons: true, users: true, language: true },
    });
  }
}
