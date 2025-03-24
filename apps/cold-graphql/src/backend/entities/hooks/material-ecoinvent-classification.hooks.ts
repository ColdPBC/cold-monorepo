
// MaterialEcoinventClassification Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { MaterialEcoinventClassification } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class MaterialEcoinventClassificationHooks extends BaseSidecar {
	constructor() {
		super(MaterialEcoinventClassification, 'material_ecoinvent_classifications');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('before MaterialEcoinventClassification read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('MaterialEcoinventClassification read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log(`before create MaterialEcoinventClassification`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('MaterialEcoinventClassification created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('before MaterialEcoinventClassification update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('MaterialEcoinventClassification updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('before MaterialEcoinventClassification delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof MaterialEcoinventClassification, OrgContext>) {
		this.logger.log('MaterialEcoinventClassification deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
