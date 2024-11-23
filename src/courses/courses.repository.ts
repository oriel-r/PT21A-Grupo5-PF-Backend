import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPagination(page, limit) {
    return await this.coursesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { lessons: true, users:true, language:true },
      order: {title:'ASC'}
    });
  }

  async findByIdWithRatings(courseId: string) {
    return this.coursesRepository.findOne({
      where: { id: courseId },
      relations: { ratedByUsers: true },
    });
  }

  async updateCourseRating(course: Course, stars: number, userId: string) {
    const user = await this.usersRepository.findOne(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');
  
    course.totalStars += stars;
    course.totalRatings += 1;
    course.averageRating = course.totalStars / course.totalRatings;
  
    course.ratedByUsers.push(user);
  
    return await this.coursesRepository.save(course);
  }
  

  async getAllCourses(
    page: number,
    limit: number,
    filters: Record<string, any>,
  ): Promise<{ data: Course[]; total: number }> {
    const queryBuilder = this.coursesRepository.createQueryBuilder('course');
    queryBuilder
      .leftJoinAndSelect('course.lessons', 'lessons')
      .leftJoinAndSelect('course.users', 'users')
      .leftJoinAndSelect('course.language', 'language');

    Object.keys(filters).forEach((key) => {
      queryBuilder.andWhere(`course.${key} = :${key}`, { [key]: filters[key] });
    });

    queryBuilder.orderBy('course.createdAt', 'ASC').skip((page - 1) * limit).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
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
