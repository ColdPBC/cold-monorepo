
// PolicyDefinition Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { PolicyDefinition } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class PolicyDefinitionHooks extends BaseSidecar {
	constructor() {
		super(PolicyDefinition, 'policy_definitions');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('before PolicyDefinition read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('PolicyDefinition read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log(`before create PolicyDefinition`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["PolicyDefinition"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["PolicyDefinition"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('PolicyDefinition created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('before PolicyDefinition update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('PolicyDefinition updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('before PolicyDefinition delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) {
		this.logger.log('PolicyDefinition deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
