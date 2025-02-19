
// ServiceDefinition Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ServiceDefinition } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
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
		for (const item of params.args.items) {
			if(GuidPrefixes["ServiceDefinition"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["ServiceDefinition"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('ServiceDefinition created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		this.logger.log('before ServiceDefinition update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
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
