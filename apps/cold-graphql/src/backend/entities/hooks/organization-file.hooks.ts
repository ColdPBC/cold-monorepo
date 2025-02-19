// OrganizationFile Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationFile } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { merge, set } from 'lodash';
import { EntityManager } from '@mikro-orm/core';

export class OrganizationFileHooks extends BaseSidecar {
	constructor() {
		super(OrganizationFile, 'organization_files');
	}

	async beforeReadHook(params: ReadHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('before OrganizationFile read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	async afterReadHook(params: ReadHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('OrganizationFile read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log(`before create OrganizationFile`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if (GuidPrefixes['OrganizationFile']) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes['OrganizationFile']).generate().scopedId);
			}

			set(item, 'organization.id', params.context.user.organization.id);

			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}

		return super.beforeCreateHook(params);
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('OrganizationFile created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('before OrganizationFile update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items as OrganizationFile[]) {
			set(item, 'updatedAt', new Date());
			if (item.metadata) {
				const em = this.entity.prototype.__factory.em as EntityManager;
				const response = await em.findOneOrFail(OrganizationFile, { id: item.id });
				// parse the metadata only if it's type is a string
				item.metadata = merge(response.metadata, typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata);
			}
		}
		return await super.beforeUpdateHook(params);
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('OrganizationFile updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('before OrganizationFile delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationFile, OrgContext>) {
		this.logger.log('OrganizationFile deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });

		return super.afterDeleteHook(params);
	}
}
