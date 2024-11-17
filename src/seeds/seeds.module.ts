import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersSeed } from './users/users-seeds';
import { CategoriesSeed } from './categories/categories-seeds';
import { CoursesSeed } from './courses/courses-seeds';
import { Language } from 'src/language/entities/language.entity';
import { LanguagesSeed } from './languages/languages-seeds';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { SubscriptionsSeeds } from './subscriptions/subscriptions-seeds';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsSeeds } from './lessons/lessons.seeder';
import { Membership } from 'src/membership/entities/membership.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Category,
      Course,
      Language,
      Subscription,
      Lesson,
      Membership
    ]),
    JwtModule,
  ],
  providers: [
    UsersSeed,
    CategoriesSeed,
    CoursesSeed,
    LanguagesSeed,
    SubscriptionsSeeds,
    LessonsSeeds,
  ],
  exports: [
    UsersSeed,
    CategoriesSeed,
    CoursesSeed,
    LanguagesSeed,
    SubscriptionsSeeds,
    LessonsSeeds,
  ],
})
export class SeedsModule {}
