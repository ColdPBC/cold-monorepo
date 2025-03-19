
// EcoinventActivityClassification Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EcoinventActivityClassification } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class EcoinventActivityClassificationHooks extends BaseSidecar {
	constructor() {
		super(EcoinventActivityClassification, 'ecoinvent_activity_classifications');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('before EcoinventActivityClassification read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('EcoinventActivityClassification read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log(`before create EcoinventActivityClassification`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('EcoinventActivityClassification created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('before EcoinventActivityClassification update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('EcoinventActivityClassification updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('before EcoinventActivityClassification delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		this.logger.log('EcoinventActivityClassification deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
