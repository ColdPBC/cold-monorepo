
// ComponentDefinition Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ComponentDefinition } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ComponentDefinitionHooks extends BaseSidecar {
	constructor() {
		super(ComponentDefinition, 'component_definitions');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('before ComponentDefinition read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('ComponentDefinition read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log(`before create ComponentDefinition`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('ComponentDefinition created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('before ComponentDefinition update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('ComponentDefinition updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('before ComponentDefinition delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ComponentDefinition, OrgContext>) {
		this.logger.log('ComponentDefinition deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
