import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export class LanguageRepository {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async getAll(page, limit) {
    return await this.languageRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations:{courses:true}
    });
  }

  async findById(id: string): Promise<Language | null> {
    return await this.languageRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Language | null> {
    return await this.languageRepository.findOneBy({ name });
  }

  async create(data): Promise<Language> {
    return await this.languageRepository.save(
      this.languageRepository.create(data),
    )[0];
  }

  async update(id, data): Promise<UpdateResult> {
    return await this.languageRepository.update(id, data);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.languageRepository.delete(id);
  }
}
