import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Course } from 'src/courses/entities/course.entity';
import { lessonsMock } from './lessons-mock';
import { Category } from 'src/categories/entities/category.entity';
import { Language } from 'src/language/entities/language.entity';
import { coursesMock } from '../courses/courses-mock';

@Injectable()
export class LessonsSeeder {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
  ) {}

  async findCategoryByName(category: string) {
    const foundCategory = await this.categoriesRepository.findOne({
      where: { name: category },
    });

    if (!foundCategory) {
      throw new Error(`Category: ${category} not found.`);
    }
    return foundCategory;
  }

  async findLanguageByName(language: string) {
    const foundLanguage = await this.languagesRepository.findOne({
      where: { name: language },
    });

    if (!foundLanguage) {
      throw new Error(`Language ${language} not found.`);
    }
    return foundLanguage;
  }

  async seed() {
    try {
      const existingLesson = (await this.lessonsRepository.find()).map(
        (lesson) => lesson.title,
      );

      const existingCourse = (await this.coursesRepository.find()).map(
        (course) => course.title,
      );
      for(const courseData of coursesMock) {
        if (!existingCourse.includes(courseData.title)) {
          const title = courseData.title;
          const language = await this.findLanguageByName(courseData.language);
          const category = await this.findCategoryByName(courseData.category);
          const img_url = courseData.image;
          const specialization = courseData.specialization;
          const level = courseData.level;
          const createdAt = courseData.createdAt;
          const brief_description = courseData.brief_description;
          const general_description = courseData.general_description;
          const lessons = []
          const newCourse = new Course({
            title,
            language,
            category,
            img_url,
            specialization,
            level,
            createdAt,
            brief_description,
            general_description,
            lessons
          });
          for (const lessonData of lessonsMock) {
            if (!existingLesson.includes(lessonData.title)) {
              const title = lessonData.title;
              const content = lessonData.content;
              const course = lessonData.course
              const lesson = new Lesson({ title, content});
              await this.lessonsRepository.save(lesson);
              if(course === newCourse.title) {
                newCourse.lessons.push(lesson)
              }
              
            }
            await this.coursesRepository.save(newCourse)
          }
        }

      }
      console.log('Courses and lessons seeding completed.');
    } catch (error) {
      console.log(error);
    }

  //     try {
  //       // Obtener todos los cursos disponibles
  //       const courses = await this.coursesRepository.find({
  //         relations: ['lessons'], // Traemos también las lecciones asociadas para actualizarlas
  //       });
  //       console.log(`Found ${courses.length} courses.`);

  //       for (const lessonData of lessonsMock) {
  //         // Verificar si el curso asociado a la lección existe
  //         const course = courses.find((c) => c.title === lessonData.course);

  //         if (!course) {
  //           console.log(`Course "${lessonData.course}" not found. Skipping lesson "${lessonData.title}".`);
  //           continue;
  //         }

  //         // Verificar si la lección ya existe en la base de datos
  //         const existingLesson = await this.lessonsRepository.findOne({
  //           where: { title: lessonData.title },
  //         });

  //         if (existingLesson) {
  //           console.log(`Lesson "${lessonData.title}" already exists. Skipping...`);
  //           continue;
  //         }

  //         // Crear y guardar la nueva lección
  //         const lesson = this.lessonsRepository.create({
  //           ...lessonData,
  //           course, // Asignar el curso relacionado
  //         });

  //         await this.lessonsRepository.save(lesson);

  //         // Actualizar la relación bidireccional en el curso
  //         course.lessons.push(lesson);
  //         await this.coursesRepository.save(course);

  //         console.log(`Lesson "${lesson.title}" created and assigned to course "${course.title}".`);
  //       }

  //       console.log('Lessons seeding completed.');
  //     } catch (error) {
  //       console.error('Error during lessons seeding:', error);
  //     }
  // }
}}
