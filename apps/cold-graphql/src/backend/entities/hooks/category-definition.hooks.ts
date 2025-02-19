
// CategoryDefinition Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { CategoryDefinition } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class CategoryDefinitionHooks extends BaseSidecar {
	constructor() {
		super(CategoryDefinition, 'category_definitions');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('before CategoryDefinition read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('CategoryDefinition read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log(`before create CategoryDefinition`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('CategoryDefinition created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('before CategoryDefinition update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('CategoryDefinition updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('before CategoryDefinition delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof CategoryDefinition, OrgContext>) {
		this.logger.log('CategoryDefinition deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
