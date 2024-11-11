import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { LessonsRepository } from './lessons.repository';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), CoursesModule],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository, CloudinaryService],
})
export class LessonsModule {}
