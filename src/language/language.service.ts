import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { LanguageRepository } from './language.repository';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { DeepPartial } from 'typeorm';
import { isEqual } from 'src/helpers/is-equal';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class LanguageService {
  constructor(
    private readonly languageRepository: LanguageRepository,
    private readonly fileUploadService: CloudinaryService,
  ) {}

  async getAll(page, limit) {
    page = Number(page) ? Number(page) : 1;
    limit = Number(limit) ? Number(limit) : 5;
    const languages = await this.languageRepository.getAll(page, limit);
    if (!languages) throw new NotFoundException('Languages not found');
    return languages;
  }

  async getById(id: string): Promise<Language> {
    const language = await this.languageRepository.findById(id);
    if (!language) throw new NotFoundException('Language not found');
    return language;
  }

  async getCoursesFromLanguage(id: string): Promise<Course[]> {
    const language = await this.languageRepository.findById(id);
    if (!language) throw new NotFoundException('Language not found');
    return language.courses;
  }

  async getByName(name: string): Promise<Language> {
    const language = await this.languageRepository.findByName(name);
    if (!language) throw new NotFoundException('Language not found');
    return language;
  }

  async addLanguage(data: CreateLanguageDto, file): Promise<Language | null> {
    const url = await this.fileUploadService.uploadFile(file);
    if (!url)
      throw new ServiceUnavailableException(
        'Have a problem from external service, retry later',
      );
    data.image_url = url;
    const newLanguage = await this.languageRepository.create(data);
    return newLanguage;
  }

  async update(id: string, data: Partial<Language>, file?) {
    const language = await this.languageRepository.findById(id);
    let url: string;
    if (file) {
      url = await this.fileUploadService.uploadFile(file);
      data.image_url = url;
    }
    if (!language) throw new NotFoundException('Product not found');
    if (isEqual(data, language))
      return new HttpException('The content is equal', HttpStatus.NO_CONTENT);
    const result = await this.languageRepository.update(id, data);
    return { message: 'Successfully updated', result };
  }

  async delete(id: string) {
    const product = await this.languageRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return await this.languageRepository.delete(id);
  }
}
