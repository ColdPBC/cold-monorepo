import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../worker';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import process from 'process';
import { ConfigService } from '@nestjs/config';
import { set } from 'lodash';

@Injectable()
export class S3ConfigurationService extends BaseWorker {
	constructor(private readonly config: ConfigService) {
		super(S3ConfigurationService.name);
	}

	async getAWSCredentials() {
		let awsCreds: any = {};

		if (process.env['FLIGHTCONTROL'] && process.env['AWS_ACCESS_KEY_ID'] && process.env['AWS_SECRET_ACCESS_KEY']) {
			awsCreds = {
				region: this.config.get('AWS_REGION', 'us-east-1'),
				credentials: {
					accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
					secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
				},
			};

			return awsCreds;
		}

		const profile = this.config.get('AWS_PROFILE', 'SSO-SYSADMIN');

		const ssoCreds = await fromSSO({ profile: profile })();

		set(process.env, `AWS_ACCESS_KEY_ID`, ssoCreds.accessKeyId);
		set(process.env, `AWS_SECRET_ACCESS_KEY`, ssoCreds.secretAccessKey);

		if (ssoCreds.sessionToken) set(process.env, `AWS_SESSION_TOKEN`, ssoCreds.sessionToken);

		return { region: this.config.get('AWS_REGION', 'us-east-1'), ...ssoCreds };
	}
}
