import { Body, Controller, Post } from '@nestjs/common';
import { EmailerService } from './emailer.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Emailer') // Grouping all endpoints under "Emailer" in Swagger
@Controller('emailer')
export class EmailerController {
  constructor(private readonly emailerService: EmailerService) {}

  @ApiOperation({
    summary: 'Send an email',
    description: 'Sends an email by providing the recipient address, subject, and message.',
  })
  @ApiBody({
    description: 'Details required to send an email',
    type: SendEmailDto,
  })
  @Post('send')
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, message } = sendEmailDto;
    return await this.emailerService.sendEmail({ to, subject, message });
  }
}

