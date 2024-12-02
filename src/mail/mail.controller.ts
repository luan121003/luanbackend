import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { FeedbackDto } from './dto/feeback.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly service: MailService) {}

  @Post()
  sendMail(@Body() body: FeedbackDto) {
    return this.service.feedBack(body);
  }
}
