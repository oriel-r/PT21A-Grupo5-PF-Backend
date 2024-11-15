import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeed } from './seeds/users/users-seeds';
import { CategoriesSeed } from './seeds/categories/categories-seeds';
import { LanguagesSeed } from './seeds/languages/languages-seeds';
import { CoursesSeed } from './seeds/courses/courses-seeds';
import { ValidationPipe } from '@nestjs/common';
import { SubscriptionsSeeds } from './seeds/subscriptions/subscriptions-seeds';
import { LessonsSeeds } from './seeds/lessons/lessons.seeder';
import { auth } from 'express-openid-connect';
import { auth0config } from './config/auth0.config';
import { LogerMiddleware } from './middlewares/loger/loger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable global validation pipe for request data validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(auth({ ...auth0config }));

  //Seeds
  const usersSeed = app.get(UsersSeed);
  await usersSeed.seed();

  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();

  const langagesSeed = app.get(LanguagesSeed);
  await langagesSeed.seed();

  const coursesSeed = app.get(CoursesSeed);
  await coursesSeed.seed();

  const subscriptionsSeed = app.get(SubscriptionsSeeds);
  await subscriptionsSeed.seed();

  const lessonsSeed = app.get(LessonsSeeds);
  await lessonsSeed.seed();

  //Swagger OpenApi settings

  const swaggerConfig = new DocumentBuilder()
    .setTitle('online-courses-platform')
    .setDescription('Description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.use(LogerMiddleware);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
