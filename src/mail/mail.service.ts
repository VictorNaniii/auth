import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  public example(toEmail, text): void {
    this.mailerService
      .sendMail({
        to: toEmail, // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<b>${text}</b>`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }
}
