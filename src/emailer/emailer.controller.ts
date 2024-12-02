import { Body, Controller, Post } from '@nestjs/common';
import { EmailerService } from './emailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('emailer')
export class EmailerController {
  constructor(private readonly emailerService: EmailerService) {}

  @Post('send')
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, message } = sendEmailDto;
    return await this.emailerService.sendEmail({ to, subject, message });
  }
}
