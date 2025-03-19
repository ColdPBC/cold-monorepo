
// ServiceDefinition Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ServiceDefinition } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ServiceDefinitionHooks extends BaseSidecar {
	constructor() {
		super(ServiceDefinition, 'service_definitions');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('before ServiceDefinition read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('ServiceDefinition read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log(`before create ServiceDefinition`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('ServiceDefinition created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('before ServiceDefinition update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('ServiceDefinition updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('before ServiceDefinition delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('ServiceDefinition deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
