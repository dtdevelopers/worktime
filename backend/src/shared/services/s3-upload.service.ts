import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
import { ApiConfigService } from './api-config.service';
import { FileDTO } from '../../interfaces/file.dto';

@Injectable()
export class S3Service {
  constructor(private configService: ApiConfigService) {}

  AWS_S3_BUCKET = this.configService.s3BucketName;
  s3 = new AWS.S3(this.configService.s3Authentication);

  async uploadFile(file: FileDTO): Promise<Partial<FileDTO>> {
    const dataBuffer: Buffer = new Buffer(
      file.content.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const lastDotPosition = file.name.lastIndexOf('.');
    const nameWithoutExtension =
      lastDotPosition !== -1 ? file.name.substr(0, lastDotPosition) : '';
    const extension = file.name
      .substr(lastDotPosition, file.name.length - 1)
      .replace('.', '');

    const uploadResult = await this.s3
      .upload({
        Bucket: this.AWS_S3_BUCKET,
        Body: dataBuffer,
        Key: this.generateFilename(nameWithoutExtension, extension)
          .split(' ')
          .join(''),
      })
      .promise();

    return {
      name: nameWithoutExtension,
      extension: extension,
      bucket: this.AWS_S3_BUCKET,
      // fileUrl: uploadResult.Location,
      storageId: uploadResult.Key,
    };
  }

  private generateFilename(fileName: string, extension: string) {
    const hash = crypto
      .createHash('sha256')
      .update(fileName + new Date().toDateString())
      .digest('base64url')
      .substring(0, 10);
    return fileName + `${hash}.${extension.toLowerCase()}`;
  }

  async downloadFile(key: string) {
    try {
      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: key,
      };
      return this.s3.getSignedUrl('getObject', {
        ...params,
        Expires: 60,
      });
    } catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e.message}`);
    }
  }
}
