
// FacilityFootprint Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { FacilityFootprint } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class FacilityFootprintHooks extends BaseSidecar {
	constructor() {
		super(FacilityFootprint, 'facility_footprints');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('before FacilityFootprint read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('FacilityFootprint read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log(`before create FacilityFootprint`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["FacilityFootprint"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["FacilityFootprint"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('FacilityFootprint created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('before FacilityFootprint update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('FacilityFootprint updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('before FacilityFootprint delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof FacilityFootprint, OrgContext>) {
		this.logger.log('FacilityFootprint deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
