// OrganizationFile Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationFile } from '../postgresql';
import { kebabCase, merge, startCase } from 'lodash';
import { EntityManager } from '@mikro-orm/core';

export class OrganizationFileHooks extends BaseSidecar {
	constructor() {
		super(OrganizationFile, 'organization_files');
	}
	// Overrride BeforeReadHook here:

	// Overrride AfterReadHook here:

	// Overrride BeforeCreateHook here:

	// Overrride AfterCreateHook here:

	// Overrride BeforeUpdateHook here:
	override async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		for (const item of params.args.items) {
			//merge metadata so that entire JSon doesn't have to be sent
			if (item.metadata) {
				const em = this.entity.prototype.__factory.em as EntityManager;
				const response = await em.findOneOrFail(OrganizationFile, { id: item.id });
				//const orgFile = await params.entities[0].(item.id);
				item.metadata = merge(response.metadata, typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata);
			}
		}

		return super.beforeUpdateHook(params);
	}
	// Overrride AfterUpdateHook here:

	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
}
