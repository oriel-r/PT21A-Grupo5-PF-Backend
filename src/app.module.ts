import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
