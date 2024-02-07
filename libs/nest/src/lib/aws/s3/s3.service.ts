// s3.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { BaseWorker } from '../../worker';
import { IAuthenticatedUser } from '../../primitives';
import crypto from 'crypto';
import stream from 'stream';

@Injectable()
export class S3Service extends BaseWorker {
  client: AWS.S3;

  constructor(private readonly config: ConfigService) {
    super(S3Service.name);
    this.client = new AWS.S3({
      credentials: {
        accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
      region: config.getOrThrow('AWS_REGION', 'us-east-1'),
    });
  }

  static getS3Config(): { credentials: { accessKeyId: string; secretAccessKey: string }; region: string } {
    const config = new ConfigService();
    return {
      credentials: {
        accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
      region: config.get('AWS_REGION', 'us-east-1'),
    };
  }

  static getS3Client() {
    return new S3Client(S3Service.getS3Config());
  }

  static async calculateChecksum(file: Express.Multer.File): Promise<string> {
    const hash = crypto.createHash('md5');
    // Create a readable stream from the buffer
    const readStream = new stream.Readable();
    readStream.push(file.buffer);
    readStream.push(null);

    // Pipe the stream through the hash to calculate checksum
    await new Promise<void>((resolve, reject) => {
      stream.pipeline(readStream, hash, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    return hash.digest('hex');
  }

  static getMulterS3Config() {
    const config = new ConfigService();
    return {
      s3: S3Service.getS3Client(),
      bucket: 'cold-api-uploaded-files',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: async (req, file, cb) => {
        const hash = await S3Service.calculateChecksum(file);
        console.log(`${file.filename} Checksum: ${hash}`);
        // Add custom metadata, such as the calculated hash
        cb(null, { md5Hash: hash });
      },
      key: function (req, file, cb) {
        const user = req['user'] as IAuthenticatedUser;
        const orgId = req['orgId'];

        // Adjust this based on your actual user object structure
        cb(null, `${config.getOrThrow('NODE_ENV')}/${orgId}/${user.coldclimate_claims.email}/${file.originalname}`);
      },
    };
  }

  async uploadStreamToS3(user: IAuthenticatedUser, org_id: string, file: Express.MulterS3.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const key = `${this.details.env}/${org_id}/${file.originalname}`;

    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: `${this.details.service}`,
      Key: key,
      Body: this.fs.createReadStream(`./uploads/${file.filename}`),
    };

    const uploaded = await this.client.upload(params).promise();
    this.logger.info(`Uploaded ${uploaded.Key} to S3`, uploaded);

    return uploaded;
  }

  async getObject(user: IAuthenticatedUser, bucket: string, key: string) {
    try {
      const s3 = new AWS.S3({
        credentials: {
          accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
        },
        region: this.config.get('AWS_REGION', 'us-east-1'),
      });

      const params: AWS.S3.Types.GetObjectRequest = {
        Bucket: bucket,
        Key: key,
      };

      const response = await s3.getObject(params).promise();

      console.log(response.ChecksumSHA256);

      return response;
    } catch (e: any) {
      this.logger.error(`Error getting object from S3: ${e.message}`, e);
      throw e;
    }
  }

  getSignedURL(user: IAuthenticatedUser, bucket: string, key: string): string {
    this.logger.info(`Generating signed URL for ${key} in bucket ${bucket}`);
    const url = this.client.getSignedUrl('getObject', { Bucket: bucket, Key: key });

    this.logger.info(`${user.coldclimate_claims.email} generated a signed URL for file: ${key}`, { url, user });
    return url;
  }
}
