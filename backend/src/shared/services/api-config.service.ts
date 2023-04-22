import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  private getNumber(key: string, defaultValue?: number): number {
    const value = this.configService.get(key, defaultValue);
    if (value === undefined) {
      throw new Error(key + ' env var not set'); // probably we should call process.exit() too to avoid locking the service
    }
    try {
      return Number(value);
    } catch {
      throw new Error(key + ' env var is not a number');
    }
  }

  private getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.configService.get(key, defaultValue?.toString());
    if (value === undefined) {
      throw new Error(key + ' env var not set');
    }
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  private getArrayFromComma(key: string, defaultValue?: string): string[] {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    try {
      return value
        .toString()
        .split(',')
        .filter((f: string) => f);
    } catch {
      throw new Error(key + ' env var is not a string comma separated');
    }
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION', this.isDevelopment);
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '../../../models/*{.model,.entity}{.ts,.js}'];
    const dbUrl = new URL(process.env.DATABASE_URL);
    const routingId = dbUrl.searchParams.get('options');
    dbUrl.searchParams.delete('options');
    return {
      entities,
      keepConnectionAlive: true,
      type: 'cockroachdb',
      ssl: true,
      url: dbUrl.toString(),
      extra: {
        options: routingId,
      },
      migrations: [
        /*...*/
      ],
      logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
    };
  }

  get mailerConfig(): MailerOptions {
    const MAIL_USER = this.getString('MAIL_USER');
    const MAIL_PASSWORD = this.getString('MAIL_PASSWORD');
    const MAIL_HOST = this.getString('MAIL_HOST');
    const MAIL_PORT = this.getNumber('MAIL_PORT', 465);
    return {
      transport: {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: MAIL_PORT === 465, // true for 465, false for other ports
        auth: {
          user: MAIL_USER, // generated ethereal user
          pass: MAIL_PASSWORD, // generated ethereal password
        },
      },
      defaults: {
        from: `Worktime <${this.getString('MAIL_FROM')}>`,
      },
      template: {
        dir: join(__dirname, '..', '..', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }

  get s3Authentication(): {
    credentials: { accessKeyId: string; secretAccessKey: string };
    region: string;
  } {
    return {
      credentials: {
        accessKeyId: this.getString('S3_ACCESS_KEY', ''),
        secretAccessKey: this.getString('S3_SECRET_KEY', ''),
      },
      region: this.getString('S3_REGION_NAME', ''),
    };
  }

  get s3BucketName(): string {
    return this.getString('S3_BUCKET_NAME', '');
  }

  get appSecret(): string {
    return this.getString('APP_SECRET', 'APPSECRET');
  }

  get authUrl(): string {
    return this.getString('AUTH_URL', 'http://localhost:5000/auth/account');
  }

  get baseUrl(): string {
    return this.getString('BASE_URL', 'http://localhost:3333');
  }

  get appConfig(): { port: number; service: string } {
    return {
      port: this.getNumber('PORT', 5001),
      service: this.getString('SERVICE', 'node'),
    };
  }
}
