// s3.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from '../../worker';
import { IAuthenticatedUser } from '../../primitives';
import crypto from 'crypto';
import stream from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3ConfigurationService } from '../../configuration';

@Injectable()
export class S3Service extends BaseWorker {
  client: S3Client;

  constructor(private readonly config: ConfigService, private readonly s3Config: S3ConfigurationService) {
    super(S3Service.name);
    this.client = new S3Client(s3Config.getAWSCredentials());
  }

  static async calculateChecksum(file): Promise<string> {
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

  async getMD5Hash(file): Promise<string> {
    return S3Service.calculateChecksum(file);
  }

  async uploadStreamToS3(user: IAuthenticatedUser, org_id: string, file) {
    const key = `${this.details.env}/${org_id}/${file.originalname}`;
    const bucket = 'cold-api-uploaded-files';
    const putCommand: PutObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
    });

    const uploaded = await this.client.send(putCommand);

    this.logger.info(`Uploaded ${key} to S3`, {
      user: user.coldclimate_claims,
      key,
      bucket,
      version: uploaded.VersionId,
    });

    return { file, key, uploaded, bucket };
  }

  async getObject(user: IAuthenticatedUser, bucket: string, key: string) {
    try {
      const s3 = new S3Client({
        credentials: {
          accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
        },
        region: this.config.get('AWS_REGION', 'us-east-1'),
      });

      const params = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const response = await s3.send(params);

      console.log(response.ChecksumSHA256);

      return response;
    } catch (e: any) {
      this.logger.error(`Error getting object from S3: ${e.message}`, e);
      throw e;
    }
  }

  async getSignedURL(user: IAuthenticatedUser, bucket: string, key: string): Promise<string> {
    this.logger.info(`Generating signed URL for ${key} in bucket ${bucket}`);
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(this.client, command, { expiresIn: 3600 });

    this.logger.info(`${user.coldclimate_claims.email} generated a signed URL for file: ${key}`, { url, user });
    return url;
  }
}
