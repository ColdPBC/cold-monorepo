
// EcoinventClassification Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EcoinventClassification } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class EcoinventClassificationHooks extends BaseSidecar {
	constructor() {
		super(EcoinventClassification, 'ecoinvent_classifications');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('before EcoinventClassification read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('EcoinventClassification read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log(`before create EcoinventClassification`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('EcoinventClassification created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('before EcoinventClassification update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('EcoinventClassification updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('before EcoinventClassification delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof EcoinventClassification, OrgContext>) {
		this.logger.log('EcoinventClassification deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
