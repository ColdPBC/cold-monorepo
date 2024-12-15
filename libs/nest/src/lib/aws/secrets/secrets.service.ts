import { Injectable, OnModuleInit } from '@nestjs/common';
import { get, map } from 'lodash';
import { GetSecretValueResponse, SecretsManager } from '@aws-sdk/client-secrets-manager';
import { BaseWorker } from '../../worker';
import process from 'process';

@Injectable()
export class SecretsService extends BaseWorker implements OnModuleInit {
	client: SecretsManager;
	awsCreds: any = {};
	ready = false;

	constructor() {
		super(SecretsService.name);
	}

	async onModuleInit() {
		await this.init();
	}

	async init() {
		// FC_ENV should only be set in the Flight Control environment, not in SM
		if (process.env['FLIGHTCONTROL'] && process.env['AWS_ACCESS_KEY_ID'] && process.env['AWS_SECRET_ACCESS_KEY']) {
			this.awsCreds = {
				region: process.env['AWS_REGION'] || 'us-east-1',
				credentials: {
					accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
					secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
				},
			};

			this.client = new SecretsManager(this.awsCreds);
			this.ready = true;
		} else {
			this.client = new SecretsManager({ region: process.env['AWS_REGION'] || 'us-east-1' });
			this.ready = true;
		}

		this.logger.log('SecretsService initialized');
	}

	async getServiceSecrets(serviceName: string): Promise<any> {
		try {
			const parts = serviceName.split('-');
			const type = parts.length > 2 ? parts[1] : 'core';
			const project = parts.length > 2 ? parts[2] : parts[1];

			const secrets = await this.getSecrets(`${type}/${project}`);

			if (!secrets) {
				this.logger.error(`No secrets found for ${type}/${project}`);
			}

			return secrets;
		} catch (e: any) {
			this.logger.error(e.message, e);
			return {};
		}
	}

	async getRootSecrets(serviceType: string): Promise<any> {
		try {
			const secrets = await this.getSecrets(serviceType);

			if (!secrets) {
				this.logger.error(`No secrets found for ${process.env.NODE_ENV}/${serviceType}`);
			}

			return secrets;
		} catch (e: any) {
			this.logger.error(e.message, e);

			throw e;
		}
	}

	async getSecrets(name: string): Promise<any> {
		const secretName = `${get(process.env, 'NODE_ENV', 'development')}/${name}`;
		try {
			const result: GetSecretValueResponse = await this.client.getSecretValue({ SecretId: secretName });
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
			this.logger.warn(`${err.message}: ${secretName}`, err);
			return;
		}
	}
}
