import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CoursesService } from 'src/courses/courses.service';
import { Lesson } from './entities/lesson.entity';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonsRepositoy: LessonsRepository,
    private readonly fileUploadService: CloudinaryService,
    private readonly coursesService: CoursesService,
  ) {}

  async getAllLessons(page, limit) {
    page = Number(page) ? Number(page) : 1;
    limit = Number(limit) ? Number(limit) : 5;
    const lessons = await this.lessonsRepositoy.getAll(page, limit);
    if (!lessons) throw new NotFoundException('No se encontraraon las clases');
    return lessons;
  }

  async getById(id: string) {
    const lesson = await this.lessonsRepositoy.getById(id);
    if (!lesson) throw new NotFoundException('No se encontra la leccion');
    return lesson;
  }

  async create(data: CreateLessonDto) {
    const { course, ...otherProperties } = data;
    const aCourse = await this.coursesService.findById(data.course);
    if (!course) throw new NotFoundException('El curso no existe');
    const lesson: Partial<Lesson> = { ...otherProperties, course: aCourse };
    return await this.lessonsRepositoy.create(lesson);
  }

  async uploadVideo(id, file) {
    const lesson = await this.lessonsRepositoy.getById(id);
    if (!lesson) throw new NotFoundException('El curso no existe');
    const url = await this.fileUploadService.uploadFile(file);
    if (!url)
      throw new ServiceUnavailableException(
        'Hubo problemas ocn el servidor externo',
      );
    return await this.lessonsRepositoy.updateVideo(id, url);
  }

  async delete(id: string): Promise<string> {
    const lessonToDelete = await this.getById(id);
    if (!lessonToDelete)
      throw new NotFoundException('No se encontra la leccion');
    try {
      await this.lessonsRepositoy.deleteLesson(id);
      return 'Lección eliminada correctamente.';
    } catch (e) {
      return 'La lección no se pudo eliminar.';
    }
  }

  async updateLesson(id: string, updateLessonDto: UpdateLessonDto) {
    const lessonToUpdate = await this.getById(id);
    if (!lessonToUpdate)
      throw new NotFoundException('No se encontra la leccion');

    const updatedLesson = Object.assign(lessonToUpdate, updateLessonDto);

    await this.lessonsRepositoy.save(updatedLesson);
    return updatedLesson;
  }

  async getAllLessonsByCourse(courseId: string, page: number, limit: number) {
    const course = await this.coursesService.findById(courseId);
    if (!course) {
      throw new BadRequestException('Curso inexistente');
    }

    return await this.lessonsRepositoy.getAllLessons(course, page, limit);
  }
}
