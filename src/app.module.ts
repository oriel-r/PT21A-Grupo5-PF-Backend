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
import { SeedsModule } from './seeds/seeds.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ChatModule } from './chat/chat.module';
import { EmailerModule } from './emailer/emailer.module';
import { LessonsModule } from './lessons/lessons.module';
import { LanguageModule } from './language/language.module';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';
import { CronsModule } from './crons/crons.module';
import { JwtModule } from '@nestjs/jwt';
import { PaymentsModule } from './payments/payments.module';
import { MercadopagoService } from './services/mercadopago/mercadopago.service';
import { MembershipModule } from './membership/membership.module';
import { ProtectedModule } from './protected/protected.module';
import { WebhooksModule } from './webhooks/webhooks.module';

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
    SeedsModule,
    SubscriptionsModule,
    ChatModule,
    EmailerModule,
    LessonsModule,
    LanguageModule,
    CronsModule,
    ProtectedModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    PaymentsModule,
    MembershipModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService, MercadopagoService],
})
export class AppModule {}
