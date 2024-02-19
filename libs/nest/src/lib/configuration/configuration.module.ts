import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GetSecretValueResponse, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import { merge, set, unset } from 'lodash';
import * as process from 'process';
import { S3ConfigurationService } from './configuration.service';

@Global()
@Module({
  providers: [S3ConfigurationService],
})
export class ConfigurationModule {
  static async getAWSCredentials(config?: ConfigService) {
    if (!config) {
      config = new ConfigService();
    }

    let awsCreds: any = {};

    // FC_ENV should only be set in the Flight Control environment, not in SM
    if (process.env['FC_ENV'] && process.env['AWS_ACCESS_KEY_ID'] && process.env['AWS_SECRET_ACCESS_KEY']) {
      awsCreds = {
        region: config.get('AWS_REGION', 'us-east-1'),
        credentials: {
          accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
          secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
        },
      };

      return awsCreds;
    }

    const profile = config?.get('AWS_PROFILE', 'default');

    const ssoCreds = await fromSSO({ profile: profile })();

    set(process.env, `AWS_ACCESS_KEY_ID`, ssoCreds.accessKeyId);
    set(process.env, `AWS_SECRET_ACCESS_KEY`, ssoCreds.secretAccessKey);

    if (ssoCreds.sessionToken) set(process.env, `AWS_SESSION_TOKEN`, ssoCreds.sessionToken);

    return { region: config.get('AWS_REGION', 'us-east-1'), ...ssoCreds };
  }

  static async forRootAsync(config?: ConfigService) {
    const { configSecrets, secrets } = await this.getSecrets(config);

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
      providers: [{ provide: 'SERVICE_SECRETS', useValue: secrets }, S3ConfigurationService, ConfigService],
      exports: [ConfigModule, 'SERVICE_SECRETS', S3ConfigurationService, ConfigService],
    };
  }

  static async getSecrets(config?: ConfigService) {
    if (!config) {
      config = new ConfigService();
    }

    const configSecrets: any = [];
    const credentials = await ConfigurationModule.getAWSCredentials(config);
    const secrets = {};

    if (!credentials?.accessKeyId) {
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
    return { configSecrets, secrets };
  }
}
