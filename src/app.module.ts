import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    //TypeOrm main configuration
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', 'env'],
      isGlobal: true,
      load: [postgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'),
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
