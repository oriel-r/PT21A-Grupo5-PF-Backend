<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersSeed } from './users/users-seeds';
import { CategoriesSeed } from './categories/categories-seeds';
import { CoursesSeed } from './courses/courses-seeds';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, Course]), JwtModule],
  providers: [UsersSeed, CategoriesSeed, CoursesSeed],
  exports: [UsersSeed, CategoriesSeed, CoursesSeed],
=======
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/entities/category.entity";
import { Course } from "src/courses/entities/course.entity";
import { User } from "src/users/entities/user.entity";
import { UsersSeed } from "./users/users-seeds";
import { CategoriesSeed } from "./categories/categories-seeds";
import { CoursesSeed } from "./courses/courses-seeds";
import { Language } from "src/language/entities/language.entity";
import { LanguagesSeed } from "./languages/languages-seeds";

@Module({
    imports:[TypeOrmModule.forFeature([User, Category, Course, Language]), JwtModule],
    providers: [UsersSeed,CategoriesSeed,CoursesSeed,LanguagesSeed],
    exports: [UsersSeed,CategoriesSeed,CoursesSeed,LanguagesSeed]
>>>>>>> dev
})
export class SeedsModule {}
