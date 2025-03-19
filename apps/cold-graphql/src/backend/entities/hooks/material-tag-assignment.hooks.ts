
// MaterialTagAssignment Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { MaterialTagAssignment } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class MaterialTagAssignmentHooks extends BaseSidecar {
	constructor() {
		super(MaterialTagAssignment, 'material_tag_assignments');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('before MaterialTagAssignment read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('MaterialTagAssignment read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log(`before create MaterialTagAssignment`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('MaterialTagAssignment created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('before MaterialTagAssignment update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('MaterialTagAssignment updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('before MaterialTagAssignment delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof MaterialTagAssignment, OrgContext>) {
		this.logger.log('MaterialTagAssignment deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
