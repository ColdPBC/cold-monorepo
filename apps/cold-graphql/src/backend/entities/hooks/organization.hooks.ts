// Organization Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Organization } from '../postgresql';
import { kebabCase, startCase } from 'lodash';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class OrganizationHooks extends BaseSidecar {
	constructor() {
		super(Organization, 'organizations');
	}

	async init() {
		/*	try {
			if (this.cache) {
				let token: any = await this.cache.get(`auth0-management-token-${process.env['NODE_ENV']}`);

				if (!token || token['data']['expiresAt'] < new Date().getMilliseconds() / 1000) {
					this.logger.error('Token Expired', { token, compared_to: new Date().getMilliseconds() / 1000 });
					token = await this.getManagementToken();
				}

				await this.setOptions(token as AxiosResponse);
			}

			if (!this.options.headers.Authorization || this.expiresAt < new Date().getSeconds()) {
				//this.logger = new WorkerLogger(Auth0UtilityService.name);
				await this.getManagementToken();
				return this.options;
			}

			return this.options;
		} catch (e: any) {
			if (e.response) {
				this.logger.error(e.response?.data?.message, { error: e.response?.data });
			}
			this.logger.error(e, { error: e.response });

			throw e;
		}*/
	}

	override async beforeCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		params.args.items.forEach(item => {
			if (item.display_name) {
				item.display_name = startCase(item.display_name);
			}

			if (item.name) {
				item.name = kebabCase(item.name).toLowerCase();
			}
		});

		return super.beforeCreateHook(params);
	}
	// Overrride BeforeReadHook here:

	// Overrride AfterReadHook here:

	// Overrride BeforeCreateHook here:

	// Overrride AfterCreateHook here:

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:

	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
}
