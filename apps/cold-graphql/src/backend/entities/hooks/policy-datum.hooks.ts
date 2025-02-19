
// PolicyDatum Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { PolicyDatum } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class PolicyDatumHooks extends BaseSidecar {
	constructor() {
		super(PolicyDatum, 'policy_data');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('before PolicyDatum read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log(`before create PolicyDatum`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["PolicyDatum"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["PolicyDatum"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('before PolicyDatum update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('before PolicyDatum delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
