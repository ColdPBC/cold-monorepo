import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthenticatedUser } from '@coldpbc/nest';
import { MulterModule } from '@nestjs/platform-express';
import multerS3 from 'multer-s3';
import { S3Service } from './s3.service';
import * as crypto from 'crypto';

@Module({})
export class S3Module {
  static async forRootAsync(bucket: string) {
    const config = new ConfigService();
    return {
      module: S3Module,
      imports: [
        MulterModule.registerAsync({
          useFactory: () => ({
            storage: multerS3({
              s3: S3Service.getS3Client(),
              bucket: bucket,
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: function (req, file, cb) {
                const user = req['user'] as IAuthenticatedUser;
                const hash = crypto.createHash('sha1');
                hash.setEncoding('hex');

                file.stream.on('end', function () {
                  hash.end();
                  console.log(hash.read()); // the desired sha1sum
                });

                // read all file and pipe it (write it) to the hash object
                file.stream.pipe(hash);
                console.log(hash);

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
