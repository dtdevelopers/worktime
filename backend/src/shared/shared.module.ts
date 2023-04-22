import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { S3Service } from './services/s3-upload.service';

const providers = [ApiConfigService, S3Service];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
