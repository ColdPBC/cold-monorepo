import { Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { SecretsManager } from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { BaseWorker } from '../../worker';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretsService extends BaseWorker {
  client: SecretsManager;
  config: ConfigService;

  constructor() {
    super(SecretsService.name);
    this.config = new ConfigService();
    this.client = new SecretsManager({
      region: this.config.get('AWS_REGION', 'us-east-1'),
    });
  }

  async getSecrets(name: string): Promise<any> {
    const secretName = `${this.config.getOrThrow('NODE_ENV')}/${name}`;
    try {
      const result: GetSecretValueResponse = await this.client.getSecretValue({ SecretId: secretName }).promise();
      let secret: any = {};
      if (result.SecretString) {
        secret = JSON.parse(result.SecretString);
      }

      await map(Object.keys(secret), key => {
        this.logger.info(`${key} loaded`);
      });

      this.logger.info(`Secrets loaded for ${secretName}`);

      return secret;
    } catch (err: any) {
      this.logger.error(`${err.message}: ${secretName}`, err);
      //throw err;
    }
  }
}
