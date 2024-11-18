import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Course } from 'src/courses/entities/course.entity';
import { lessonsMock } from './lessons-mock';

@Injectable()
export class LessonsSeeder {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async seed() {
    try {
      // Obtener todos los cursos disponibles
      const courses = await this.coursesRepository.find({
        relations: ['lessons'], // Traemos también las lecciones asociadas para actualizarlas
      });
      console.log(`Found ${courses.length} courses.`);

      for (const lessonData of lessonsMock) {
        // Verificar si el curso asociado a la lección existe
        const course = courses.find((c) => c.title === lessonData.course);

        if (!course) {
          console.log(`Course "${lessonData.course}" not found. Skipping lesson "${lessonData.title}".`);
          continue;
        }

        // Verificar si la lección ya existe en la base de datos
        const existingLesson = await this.lessonsRepository.findOne({
          where: { title: lessonData.title },
        });

        if (existingLesson) {
          console.log(`Lesson "${lessonData.title}" already exists. Skipping...`);
          continue;
        }

        // Crear y guardar la nueva lección
        const lesson = this.lessonsRepository.create({
          ...lessonData,
          course, // Asignar el curso relacionado
        });

        await this.lessonsRepository.save(lesson);

        // Actualizar la relación bidireccional en el curso
        course.lessons.push(lesson);
        await this.coursesRepository.save(course);

        console.log(`Lesson "${lesson.title}" created and assigned to course "${course.title}".`);
      }

      console.log('Lessons seeding completed.');
    } catch (error) {
      console.error('Error during lessons seeding:', error);
    }
  }
}
