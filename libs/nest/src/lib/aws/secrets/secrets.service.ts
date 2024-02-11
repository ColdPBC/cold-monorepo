import { Injectable, OnModuleInit } from '@nestjs/common';
import { get, map } from 'lodash';
import { SecretsManager } from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { BaseWorker } from '../../worker';
import { ConfigurationModule } from '../../configuration';

@Injectable()
export class SecretsService extends BaseWorker implements OnModuleInit {
  client: SecretsManager;

  constructor() {
    super(SecretsService.name);

    this.client = new SecretsManager({
      region: get('AWS_REGION', 'us-east-1'),
    });
  }

  override async onModuleInit() {
    this.client = new SecretsManager(await ConfigurationModule.getAWSCredentials());
    this.logger.info('SecretsService initialized');
  }

  async getServiceSecrets(serviceName: string): Promise<any> {
    try {
      const parts = serviceName.split('-');
      const type = parts.length > 2 ? parts[1] : 'core';
      const project = parts.length > 2 ? parts[2] : parts[1];

      const secrets = await this.getSecrets(`${type}/${project}`);

      return secrets;
    } catch (e: any) {
      this.logger.error(e.message, e);
      return {};
    }
  }

  async getRootSecrets(serviceName: string): Promise<any> {
    try {
      const parts = serviceName.split('-');
      const type = parts.length > 2 ? parts[1] : 'core';

      const secrets = await this.getSecrets(type);

      return secrets;
    } catch (e: any) {
      this.logger.error(e.message, e);

      throw e;
    }
  }

  async getSecrets(name: string): Promise<any> {
    const secretName = `${get(process.env, 'NODE_ENV', 'development')}/${name}`;
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
      throw err;
    }
  }
}
