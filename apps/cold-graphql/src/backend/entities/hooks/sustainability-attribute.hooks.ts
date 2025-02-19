
// SustainabilityAttribute Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { SustainabilityAttribute } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class SustainabilityAttributeHooks extends BaseSidecar {
	constructor() {
		super(SustainabilityAttribute, 'sustainability_attributes');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('before SustainabilityAttribute read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('SustainabilityAttribute read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`before create SustainabilityAttribute`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["SustainabilityAttribute"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["SustainabilityAttribute"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('SustainabilityAttribute created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('before SustainabilityAttribute update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('SustainabilityAttribute updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('before SustainabilityAttribute delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('SustainabilityAttribute deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
