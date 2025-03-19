
// ActionTemplate Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ActionTemplate } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ActionTemplateHooks extends BaseSidecar {
	constructor() {
		super(ActionTemplate, 'action_templates');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('before ActionTemplate read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('ActionTemplate read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log(`before create ActionTemplate`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('ActionTemplate created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('before ActionTemplate update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('ActionTemplate updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('before ActionTemplate delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ActionTemplate, OrgContext>) {
		this.logger.log('ActionTemplate deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
