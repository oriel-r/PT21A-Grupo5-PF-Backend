import { Module } from '@nestjs/common';
import { EmailerService } from './emailer.service';
import { EmailerController } from './emailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD.replace(/_/g, ' '),
        },
      },
      defaults: {
        from: 'Rompiendo Barreras <rompiendobarreras.pt21a@gmail.com>',
      },
    }),
  ],
  controllers: [EmailerController],
  providers: [EmailerService],
  exports: [EmailerService],
})
export class EmailerModule {}
