import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { LanguageRepository } from './language.repository';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageRepository, LanguageService, CloudinaryService],
  exports: [LanguageService, LanguageRepository]
})
export class LanguageModule {}
