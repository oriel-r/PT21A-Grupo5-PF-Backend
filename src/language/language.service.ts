import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { LanguageRepository } from './language.repository';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Injectable()
export class LanguageService {
    constructor(
        private readonly languageRepository: LanguageRepository,
        private readonly fileUploadService: CloudinaryService
    ) {}

    async getAll() {
        const languages = await this.languageRepository.getAll()
        if(!languages) throw new NotFoundException('Languages not found')
        return languages
    }

    async getById(id: string): Promise<Language> {
        const language = await this.languageRepository.findById(id)
        if(!language) throw new NotFoundException('Language not found')
        return language
    }

    async getByName(name: string): Promise<Language> {
        const language = await this.languageRepository.findByName(name)
        if(!language) throw new NotFoundException('Language not found')
        return language
    }

    async addLanguage(data: CreateLanguageDto, file): Promise<Language | null> {
        const url = await this.fileUploadService.uploadFile(file)
        if(!url) throw new ServiceUnavailableException('Have a problem from external service, retry later')
        data.image_url = url
        const newLanguage = await this.languageRepository.create(data)
        return newLanguage
    } 
}
