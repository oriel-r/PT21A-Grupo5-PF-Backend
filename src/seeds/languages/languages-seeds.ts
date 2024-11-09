import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/language/entities/language.entity';
import { In, Repository } from 'typeorm';
import { languagesMock } from './languages-mock';

@Injectable()
export class LanguagesSeed {
  constructor(
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
  ) {}

  async seed() {
    const existingLanguage = await this.languagesRepository.find({
      where: { name: In(languagesMock) },
    });

    for (const languageName of languagesMock) {
      if (
        !existingLanguage.some((language) => language.name === languageName)
      ) {
        const language = new Language();
        language.name = languageName;
        await this.languagesRepository.save(language);
      }
    }
  }
}
