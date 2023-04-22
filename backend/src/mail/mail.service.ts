import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiConfigService } from 'src/shared/services/api-config.service';

type ForgotPasswordProps = {
  key: string;
  name: string;
  email: string;
};

type AccountCreationProps = {
  name: string;
  email: string;
};

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly apiConfigService: ApiConfigService,
  ) {}

  public async sendCreationAccount({
    email,
    name,
  }: AccountCreationProps): Promise<void> {
    this.mailerService
      .sendMail({
        to: email,
        subject: 'Account creation',
        template: 'account-creation',
        context: {
          name,
          email,
          logoUrl: `${this.apiConfigService.baseUrl}/assets/logo.png`,
          url: this.apiConfigService.baseUrl,
        },
      })
      .catch(console.error);
  }

  public async sendResetPasswordInit({
    email,
    key,
    name,
  }: ForgotPasswordProps): Promise<void> {
    this.mailerService
      .sendMail({
        to: email,
        subject: 'Redefinição de senha',
        template: 'password-reset',
        context: {
          name,
          baseUrl: this.apiConfigService.baseUrl,
          url: `${this.apiConfigService.baseUrl}/#/recover-finish/${key}`,
        },
      })
      .catch(console.error);
  }
}
