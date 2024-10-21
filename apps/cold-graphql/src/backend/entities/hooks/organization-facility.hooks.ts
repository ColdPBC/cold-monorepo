// OrganizationFacility Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationFacility } from '../postgresql';
import { startCase } from 'lodash';

export class OrganizationFacilityHooks extends BaseSidecar {
	constructor() {
		super(OrganizationFacility, 'organization_facilities');
	}

	override async beforeCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`before create ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		params.args.items.forEach(item => {
			if (item.name) {
				item.name = startCase(item.name);
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
