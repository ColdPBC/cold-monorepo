// Organization Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Organization, OrganizationFile } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { kebabCase, merge, set, startCase } from 'lodash';
import { EntityManager } from '@mikro-orm/core';

export class OrganizationHooks extends BaseSidecar {
	constructor() {
		super(Organization, 'organizations');
	}

	async beforeReadHook(params: ReadHookParams<typeof Organization, OrgContext>) {
		this.logger.log('before Organization read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	async afterReadHook(params: ReadHookParams<typeof Organization, OrgContext>) {
		this.logger.log('Organization read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log(`before create Organization`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items as Organization[]) {
			if (GuidPrefixes['Organization']) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes['Organization']).generate().scopedId);
			}

			if (item.displayName) {
				item.displayName = startCase(item.displayName);
			}

			if (item.name) {
				item.name = kebabCase(item.name).toLowerCase();
			}

			set(item, 'organization.id', params.context.user.organization.id);

			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}

		return super.beforeCreateHook(params);
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('Organization created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('before Organization update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('Organization updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof Organization, OrgContext>) {
		this.logger.log('before Organization delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });

		const protectedOrgs = ['cold-climate-development', 'cold-climate-staging', 'cold-climate-production'];
		return super.beforeDeleteHook(params);
	}

	async afterDeleteHook(params: DeleteHookParams<typeof Organization, OrgContext>) {
		this.logger.log('Organization deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}
}
