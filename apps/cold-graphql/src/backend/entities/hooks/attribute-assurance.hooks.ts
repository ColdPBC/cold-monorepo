
// AttributeAssurance Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { AttributeAssurance } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class AttributeAssuranceHooks extends BaseSidecar {
	constructor() {
		super(AttributeAssurance, 'attribute_assurances');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('before AttributeAssurance read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('AttributeAssurance read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log(`before create AttributeAssurance`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["AttributeAssurance"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["AttributeAssurance"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('AttributeAssurance created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('before AttributeAssurance update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('AttributeAssurance updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('before AttributeAssurance delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof AttributeAssurance, OrgContext>) {
		this.logger.log('AttributeAssurance deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
