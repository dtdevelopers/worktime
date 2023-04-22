import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { types } from 'pg';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.use(bodyParser.json({ limit: '80mb' }));
  app.use(bodyParser.urlencoded({ limit: '80mb', extended: true }));
  types.setTypeParser(types.builtins.INT8, (value) => parseInt(value));
  app.setGlobalPrefix('api');
  const configService = app.select(SharedModule).get(ApiConfigService);
  const port = configService.appConfig.port;
  await app.listen(port);
  console.info(`Worktime server running on port ${port}`);
}

bootstrap();
