
// OrganizationCompliancesOld Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationCompliancesOld } from '../postgresql';

export class OrganizationCompliancesOldHooks extends BaseSidecar {
	constructor() {
		super(OrganizationCompliancesOld, 'organization_compliances_old');
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
