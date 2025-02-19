
// SustainabilityAttributeClassifcationAssignment Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { SustainabilityAttributeClassifcationAssignment } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class SustainabilityAttributeClassifcationAssignmentHooks extends BaseSidecar {
	constructor() {
		super(SustainabilityAttributeClassifcationAssignment, 'sustainability_attribute_classifcation_assignment');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('before SustainabilityAttributeClassifcationAssignment read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('SustainabilityAttributeClassifcationAssignment read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log(`before create SustainabilityAttributeClassifcationAssignment`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["SustainabilityAttributeClassifcationAssignment"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["SustainabilityAttributeClassifcationAssignment"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('SustainabilityAttributeClassifcationAssignment created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('before SustainabilityAttributeClassifcationAssignment update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('SustainabilityAttributeClassifcationAssignment updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('before SustainabilityAttributeClassifcationAssignment delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof SustainabilityAttributeClassifcationAssignment, OrgContext>) {
		this.logger.log('SustainabilityAttributeClassifcationAssignment deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
