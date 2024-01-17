import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from '@coldpbc/nest';
import { MulterModule } from '@nestjs/platform-express';
import multerS3 from 'multer-s3';
import { S3Service } from './s3.service';

@Module({})
export class S3Module {
  static async forRootAsync() {
    const config = new ConfigService();
    return {
      module: S3Module,
      imports: [
        MulterModule.registerAsync({
          useFactory: () => ({
            storage: multerS3({
              s3: S3Service.getS3Client(),
              bucket: config.getOrThrow('DD_SERVICE'),
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: function (req, file, cb) {
                const user = req['user'] as AuthenticatedUser;
                const orgId = req['orgId'];

                // Adjust this based on your actual user object structure
                cb(null, `${config.getOrThrow('NODE_ENV')}/${orgId}/${user.coldclimate_claims.email}/${file.originalname}`);
              },
            }),
          }),
        }),
      ],
      providers: [S3Service],
      exports: [S3Service],
    };
  }
}
