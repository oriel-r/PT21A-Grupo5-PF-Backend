import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async getPagination(page, limit) {
    return await this.coursesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { lessons: true, users:true, language:true },
      order: {title:'ASC'}
    });
  }

  async getAllCourses(page, limit): Promise<Course[]> {
    return await this.coursesRepository.find({
      relations: { lessons: true, users: true, language: true },
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit
    });
  }

  async findAll() {
    return await this.coursesRepository.find({relations: { lessons: true, users: true, language: true },})
  }
  

  async findByTitle(title: string): Promise<Course | null> {
    return await this.coursesRepository.findOne({
      where: { title },
      relations: { lessons: true, users: true, language: true },
    });
  }

  async findById(id: string): Promise<Course> {
    const result = await this.coursesRepository.findOne({
      where: { id },
      relations: { users: true, lessons: true, language: true },
    });
    if (!result) throw new NotFoundException('Curso no encontrado');
    return result;
  }

  async createCourse(data): Promise<Course[]> {
    return await this.coursesRepository.save(
      this.coursesRepository.create(data),
    );
  }
}
