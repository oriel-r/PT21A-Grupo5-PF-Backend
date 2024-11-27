import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesRepository } from './courses.repository';
import { UsersModule } from 'src/users/users.module';
import { LanguageModule } from 'src/language/language.module';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), forwardRef(() => UsersModule), LanguageModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, CloudinaryService],
  exports: [CoursesService],
})
export class CoursesModule {}
