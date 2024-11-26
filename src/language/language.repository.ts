import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FilterCourses } from 'src/helpers/Filter';

export class LanguageRepository {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async getAndFilter(
    path: string,
    filters: FilterCourses,
  ): Promise<Language[]> {
    const queryBuilder = await this.languageRepository
      .createQueryBuilder('language')
      .leftJoinAndSelect('language.courses', 'course')
      .leftJoinAndSelect('course.category', 'category')
      .where('language.path = :path', { path });

    if (filters.specialization) {
      queryBuilder.andWhere('course.specialization = :specialization', {
        specialization: filters.specialization,
      });
    }

    if (filters.level) {
      queryBuilder.andWhere('course.level = :level', { level: filters.level });
    }

    if (filters.category) {
      queryBuilder.andWhere('category.name = :category', {
        category: filters.category,
      });
    }

    return await queryBuilder.getMany();
  }

  async getPagination(page, limit) {
    return await this.languageRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { courses: true },
    });
  }

  async getAll(): Promise<Language[]> {
    return await this.languageRepository.find({ relations: { courses: true } });
  }

  async findById(id: string): Promise<Language | null> {
    return await this.languageRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Language | null> {
    return await this.languageRepository.findOneBy({ name });
  }

  async create(language:Language) {
    return await this.languageRepository.save(language);
  }

  async update(id, data): Promise<UpdateResult> {
    return await this.languageRepository.update(id, data);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.languageRepository.delete(id);
  }
}
