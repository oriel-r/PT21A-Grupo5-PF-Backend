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
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config cookie
  app.use(cookieParser())

  app.use(
    session({
      secret: 'f9c2ba3e7f524b4a9095c8e75c98fef4b029b7faeead8f3319c4fcedb94a756a1a0b4f7f2600f2899b1e6e4b3a645f09310e8d912aec1aef52eafe7c54d9e3f4', 
      resave: false,
      saveUninitialized: true,
      cookie: { httpOnly: true, secure: false }, // Cambiar a true si se usa HTTPS
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
