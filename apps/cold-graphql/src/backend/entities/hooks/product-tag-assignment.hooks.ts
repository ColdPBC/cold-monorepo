
// ProductTagAssignment Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ProductTagAssignment } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ProductTagAssignmentHooks extends BaseSidecar {
	constructor() {
		super(ProductTagAssignment, 'product_tag_assignments');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('before ProductTagAssignment read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('ProductTagAssignment read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log(`before create ProductTagAssignment`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["ProductTagAssignment"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["ProductTagAssignment"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('ProductTagAssignment created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('before ProductTagAssignment update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('ProductTagAssignment updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('before ProductTagAssignment delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ProductTagAssignment, OrgContext>) {
		this.logger.log('ProductTagAssignment deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
