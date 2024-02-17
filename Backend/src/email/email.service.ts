import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}
    async sendUserConfirmation(token: string, fullName: string, email: string) {
        const url = `example.com/auth/confirm?token=${token}`;
    
       let emailResp =  await this.mailerService.sendMail({
          to: email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Mentorhub@NU!',
          template: './confirmation', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            name: fullName,
          },
        });
        console.log('sendUserConfirmation emailResp: ', emailResp);
    }

    async sendForgotPassword(email: string, token: string) {
        const url = `https://google.com?token=${token}`;
        let emailResp =  await this.mailerService.sendMail({
          to: email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Reset Your Password',
          template: './resetPassword', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            url: url,
          },
        });
        console.log('sendForgotPassword emailResp: ', emailResp);
    }
}
