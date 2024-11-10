import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeed } from './seeds/users/users-seeds';
import { CategoriesSeed } from './seeds/categories/categories-seeds';
import { LanguagesSeed } from './seeds/languages/languages-seeds';
import { CoursesSeed } from './seeds/courses/courses-seeds';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable global validation pipe for request data validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  //Seeds
  const usersSeed = app.get(UsersSeed);
  await usersSeed.seed();
  console.log('Users injection completed');

  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('Categories injection completed.');

  const langagesSeed = app.get(LanguagesSeed);
  await langagesSeed.seed();
  console.log('Languages injection completed');

  const coursesSeed = app.get(CoursesSeed);
  await coursesSeed.seed();
  console.log('Courses injection completed.');

  //Swagger OpenApi settings

  const swaggerConfig = new DocumentBuilder()
    .setTitle('online-courses-platform')
    .setDescription('Description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
