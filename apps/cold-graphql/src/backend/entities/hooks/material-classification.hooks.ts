
// MaterialClassification Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { MaterialClassification } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class MaterialClassificationHooks extends BaseSidecar {
	constructor() {
		super(MaterialClassification, 'material_classification');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('before MaterialClassification read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('MaterialClassification read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log(`before create MaterialClassification`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('MaterialClassification created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('before MaterialClassification update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('MaterialClassification updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('before MaterialClassification delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof MaterialClassification, OrgContext>) {
		this.logger.log('MaterialClassification deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
