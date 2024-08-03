// s3.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from '../../worker';
import { AuthenticatedUser, IAuthenticatedUser } from '../../primitives';
import crypto from 'crypto';
import stream from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service extends BaseWorker implements OnModuleInit {
  client: S3Client;

  constructor(private readonly config: ConfigService) {
    super(S3Service.name);
    this.client = new S3Client('us-east-1');
  }

  override async onModuleInit(): Promise<void> {
    await super.onModuleInit();

    const altCreds = {
      region: this.config.get('AWS_REGION', 'us-east-1'),
      accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
    };
    this.client = new S3Client(altCreds);
    this.logger.info('S3 Client initialized');
  }

  static async calculateChecksum(file): Promise<string> {
    return S3Service.calculateBufferChecksum(file.buffer);
  }

  static async calculateBufferChecksum(fileBuffer: ArrayBuffer): Promise<string> {
    const hash = crypto.createHash('md5');
    // Create a readable stream from the buffer
    const readStream = new stream.Readable();
    readStream.push(fileBuffer);
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

  async getObject(
    user:
      | IAuthenticatedUser
      | AuthenticatedUser
      | {
          coldclimate_claims: { email: string };
        },
    bucket: string,
    key: string,
  ) {
    try {
      this.logger.info(`Getting object from S3: ${key} in bucket ${bucket}`, {
        user: user.coldclimate_claims,
        key,
        bucket,
      });

      const params = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const response = await this.client.send(params);

      console.log(response.ChecksumSHA256);

      return response;
    } catch (e: any) {
      this.logger.error(`Error getting object from S3: ${e.message}`, e);
      throw e;
    }
  }

  async getSignedURL(user: IAuthenticatedUser, bucket: string, key: string, expires: number = 3600): Promise<string> {
    this.logger.info(`Generating signed URL for ${key} in bucket ${bucket}`);
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(this.client, command, { expiresIn: expires });

    this.logger.info(`${user.coldclimate_claims.email} generated a signed URL for file: ${key}`, { url, user });
    return url;
  }
}
