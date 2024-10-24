import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GetSecretValueResponse, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import { merge, unset } from 'lodash';
import * as process from 'process';
import { S3ConfigurationService } from './configuration.service';

@Global()
@Module({})
export class ConfigurationModule {
	static async getAWSCredentials() {
		let awsCreds: any = {};

		// FC_ENV should only be set in the Flight Control environment, not in SM
		if (process.env['FLIGHTCONTROL'] && process.env['AWS_ACCESS_KEY_ID'] && process.env['AWS_SECRET_ACCESS_KEY']) {
			awsCreds = {
				region: process.env['AWS_REGION'] || 'us-east-1',
				credentials: {
					accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
					secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
				},
			};

			return { ...awsCreds };
		}

		const profile = process.env['AWS_PROFILE'] || 'default';
		const ssoCreds = await fromSSO({ profile: profile })();

		return ssoCreds;
	}

	static async loadSecrets() {
		const config = new ConfigService();

		const configSecrets: any = [];
		const aws = await ConfigurationModule.getAWSCredentials();
		const secrets = {};

		if (!aws.credentials?.accessKeyId && !aws.accessKeyId) {
			throw new Error('Unable to locate AWS Credentials!');
		}

		if (!aws.credentials?.sessionToken && !aws.sessionToken) {
			unset(aws.credentials, 'SessionToken');
		}

		const client = new SecretsManager({
			...aws,
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

		const mqtt = {
			wsOptions: {
				headers: {
					'x-auth0-domain': secrets['AUTH0_DOMAIN'],
					'x-amz-customauthorizer-name': 'mqtt_authorizer',
					'x-cold-env': `${process.env['NODE_ENV']}`,
				},
			},
			host: secrets['MQTT_HOST'],
			port: 8883,
			clientId: `${secrets['DD_SERVICE']}_${new Date().getTime()}`,
			protocol: 'mqtts',
			protocolVersion: 5,
			key: Buffer.from(secrets['MQTT_PRIVATE_KEY'], 'base64'),
			cert: Buffer.from(secrets['MQTT_PRIVATE_KEY'], 'base64'),
			ca: [`${Buffer.from(secrets['MQTT_CA_ROOT_1'], 'base64')}`, `${Buffer.from(secrets['MQTT_CA_ROOT_3'], 'base64')}`],
		};
		return { configSecrets, secrets, mqtt };
	}

	static async forRootAsync() {
		const configs = await ConfigurationModule.loadSecrets();

		/**
		 * Imports Array
		 */
		const imports: any = [
			ConfigModule.forRoot({
				isGlobal: true,
				load: [() => configs, () => configs.mqtt],
			}),
		];

		return {
			module: ConfigurationModule,
			imports,
			providers: [{ provide: 'SERVICE_SECRETS', useValue: configs }, S3ConfigurationService, ConfigService],
			exports: [ConfigModule, 'SERVICE_SECRETS', S3ConfigurationService, ConfigService],
		};
	}
}
