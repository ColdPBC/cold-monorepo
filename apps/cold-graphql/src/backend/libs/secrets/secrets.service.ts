import { get, map } from 'lodash';
import { GetSecretValueResponse, SecretsManager } from '@aws-sdk/client-secrets-manager';
import process from 'process';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import { WorkerLogger } from '../logger';

export class SecretsService {
	client: SecretsManager | undefined;
	logger: WorkerLogger;
	ready = false;

	constructor() {
		this.logger = new WorkerLogger(SecretsService.name);
	}

	async init() {
		let awsCreds: any = {};

		// FC_ENV should only be set in the Flight Control environment, not in SM
		if (process.env['FC_ENV'] && process.env['AWS_ACCESS_KEY_ID'] && process.env['AWS_SECRET_ACCESS_KEY']) {
			awsCreds = {
				region: process.env['AWS_REGION'] || 'us-east-1',
				credentials: {
					accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
					secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
				},
			};

			return { ...awsCreds };
		}

		const profile = process.env['AWS_PROFILE'] || 'SSO-SYSADMIN';
		const ssoCreds = await fromSSO({ profile: profile })();
		this.client = new SecretsManager({ region: process.env['AWS_REGION'] || 'us-east-1', ...ssoCreds });

		this.logger.log('SecretsService initialized');
		this.ready = true;
	}

	async getServiceSecrets(serviceName: string): Promise<any> {
		try {
			if (!this.client) {
				await this.init();
			}

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
			if (!this.client) {
				await this.init();
			}

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
		if (!this.client) {
			await this.init();
		}

		const secretName = `${get(process.env, 'NODE_ENV', 'development')}/${name}`;
		try {
			if (!this.client) {
				await this.init();
			}

			const result: GetSecretValueResponse | undefined = await this.client?.getSecretValue({ SecretId: secretName });
			if (!result) {
				throw new Error(`Secret ${result} not found`);
			}
			let secret: any = {};
			if (result.SecretString) {
				secret = JSON.parse(result.SecretString);
			}

			this.logger.log(`Secrets loaded for ${secretName}`);

			return secret;
		} catch (err: any) {
			this.logger.error(`${err.message}: ${secretName}`, err);
			throw err;
		}
	}
}
