import { Global, Module } from '@nestjs/common';
import { S3Service } from './s3.service';

@Global()
@Module({
  imports: [],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  static async forRootAsync(secrets: any) {
    return {
      module: S3Module,
      imports: [], //await ConfigurationModule.forRootAsync()],
      providers: [S3Service, { provide: 'SECRETS', useValue: secrets }],
      exports: [S3Service, 'SECRETS'],
    };
  }
}
