
// MaterialClassificationActivity Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { MaterialClassificationActivity } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class MaterialClassificationActivityHooks extends BaseSidecar {
	constructor() {
		super(MaterialClassificationActivity, 'material_classification_activities');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('before MaterialClassificationActivity read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('MaterialClassificationActivity read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log(`before create MaterialClassificationActivity`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('MaterialClassificationActivity created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('before MaterialClassificationActivity update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('MaterialClassificationActivity updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('before MaterialClassificationActivity delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof MaterialClassificationActivity, OrgContext>) {
		this.logger.log('MaterialClassificationActivity deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
