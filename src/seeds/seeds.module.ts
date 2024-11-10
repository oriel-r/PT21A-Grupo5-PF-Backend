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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Course, Language, Subscription]),
    JwtModule,
  ],
  providers: [
    UsersSeed,
    CategoriesSeed,
    CoursesSeed,
    LanguagesSeed,
    SubscriptionsSeeds,
  ],
  exports: [
    UsersSeed,
    CategoriesSeed,
    CoursesSeed,
    LanguagesSeed,
    SubscriptionsSeeds,
  ],
})
export class SeedsModule {}
