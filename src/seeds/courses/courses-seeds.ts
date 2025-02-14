import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Language } from 'src/language/entities/language.entity';
import { Repository } from 'typeorm';
import { coursesMock } from './courses-mock';

@Injectable()
export class CoursesSeed {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
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
      const existingCourse = (await this.coursesRepository.find()).map(
        (course) => course.title,
      );

      for (const courseData of coursesMock) {
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
          const course = new Course({
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
          await this.coursesRepository.save(course);
        }
      }

      console.log('Courses injection completed.');
    } catch (error) {
      console.log(error);
    }
  }
}
