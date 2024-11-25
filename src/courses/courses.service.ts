import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './courses.repository';
import { Course } from './entities/course.entity';
import { retry } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async getPagination(page, limit) {
    page = Number(page) ? Number(page) : 1;
    limit = Number(limit) ? Number(limit) : 5;
    const courses = await this.coursesRepository.getPagination(page, limit);
    if (!courses) throw new NotFoundException('Courses not found');
    return courses;
  }

  async rateCourse(courseId: string, userId: string, stars: number) {
    if (stars < 1 || stars > 5) {
      throw new BadRequestException('Las estrellas deben estar entre 1 y 5');
    }

    const course = await this.coursesRepository.findByIdWithRatings(courseId);
    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    const userAlreadyRated = course.ratedByUsers.some(
      (user) => user.id === userId,
    );
    if (userAlreadyRated) {
      throw new BadRequestException('El usuario ya ha calificado este curso');
    }

    const updatedCourse = await this.coursesRepository.updateCourseRating(
      course,
      stars,
      userId,
    );

    return updatedCourse;
  }

  async create(data: CreateCourseDto, file) {
    const existCourse = await this.coursesRepository.findByTitle(data.title);
    if (existCourse) throw new BadRequestException('The course already exist');
    return await this.coursesRepository.createCourse(data);
  }

  async findAll(queries) {
    const { page, limit, ...filters } = queries;
    const skip = Number(page) ? Number(page) : 1;
    const take = Number(limit) ? Number(limit) : 5;
    const courses = await this.coursesRepository.getAllCourses(
      skip,
      take,
      filters,
    );
    if (!courses) throw new NotFoundException();
    return courses;
  }

  async findAllCourses() {
    return await this.coursesRepository.findAll();
  }

  async findOne(title: string) {
    return await this.coursesRepository.findByTitle(title);
  }

  async findById(id: string): Promise<Course> {
    return await this.coursesRepository.findById(id);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: number) {
    return `This action removes a #${id} course`;
  }


}
