import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GetSecretValueResponse, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import { merge, set, unset } from 'lodash';
import * as process from 'process';

@Module({})
export class ConfigurationModule {
  static async getAWSCredentials() {
    let awsCreds: any = {};

    if (process.env['AWS_ACCESS_KEY_ID'] && process.env['AWS_SECRET_ACCESS_KEY']) {
      awsCreds = {
        region: process.env['AWS_REGION'] || 'us-east-1',
        credentials: {
          accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
          secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
        },
      };

      return awsCreds;
    }

    const ssoCreds = await fromSSO({ profile: 'default' })();
    set(process.env, `AWS_ACCESS_KEY_ID`, ssoCreds.accessKeyId);
    set(process.env, `AWS_SECRET_ACCESS_KEY`, ssoCreds.secretAccessKey);
    if (ssoCreds.sessionToken) set(process.env, `AWS_SESSION_TOKEN`, ssoCreds.sessionToken);

    return ssoCreds;
  }

  static async forRootAsync() {
    const config = new ConfigService();
    const configSecrets: any = [];
    const credentials = await ConfigurationModule.getAWSCredentials();
    const secrets = {};

    if (!credentials.credentials?.accessKeyId) {
      throw new Error('Unable to locate AWS Credentials!');
    }

    if (!credentials.credentials?.sessionToken) {
      unset(credentials, 'Credentials.SessionToken');
    }

    const client = new SecretsManager({
      ...credentials,
    });

    const parts = config.getOrThrow('DD_SERVICE')?.split('-');

    const type = parts.length > 2 ? parts[1] : 'core';
    const project = parts.length > 2 ? parts[2] : parts[1];

    const typeResponse = await client.getSecretValue({ SecretId: `${config.getOrThrow('NODE_ENV')}/${type}` });

    if (typeResponse.SecretString) {
      const typeSecrets = JSON.parse(typeResponse.SecretString);
      configSecrets.push(() => typeSecrets);
      merge(secrets, typeSecrets);
    }

    const projectResult: GetSecretValueResponse = await client.getSecretValue({ SecretId: `${config.getOrThrow('NODE_ENV')}/${type}/${project}` });

    if (projectResult.SecretString) {
      const serviceSecrets = JSON.parse(projectResult.SecretString);
      configSecrets.push(() => serviceSecrets);
      merge(secrets, serviceSecrets);
    }

    /**
     * Imports Array
     */
    const imports: any = [
      ConfigModule.forRoot({
        isGlobal: true,
        load: configSecrets,
      }),
    ];

    return {
      module: ConfigurationModule,
      imports,
      providers: [{ provide: 'SERVICE_SECRETS', useValue: secrets }],
      exports: [ConfigModule, 'SERVICE_SECRETS'],
    };
  }
}
