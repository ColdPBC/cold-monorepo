
// ComplianceSectionGroup Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ComplianceSectionGroup } from '../postgresql';

export class ComplianceSectionGroupHooks extends BaseSidecar {
	constructor() {
		super(ComplianceSectionGroupHooks.name, ComplianceSectionGroup);
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
