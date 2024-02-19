import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationModule } from '@coldpbc/nest';
import { S3Service } from './s3.service';

@Global()
@Module({})
export class S3Module {
  static async forRootAsync(secrets: any) {
    const config = new ConfigService();
    return {
      module: S3Module,
      imports: [await ConfigurationModule.forRootAsync(config)],
      providers: [S3Service, { provide: 'SECRETS', useValue: secrets }],
      exports: [S3Service, 'SECRETS'],
    };
  }
}
