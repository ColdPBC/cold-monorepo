
// EcoinventActivityImpact Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EcoinventActivityImpact } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class EcoinventActivityImpactHooks extends BaseSidecar {
	constructor() {
		super(EcoinventActivityImpact, 'ecoinvent_activity_impacts');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('before EcoinventActivityImpact read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('EcoinventActivityImpact read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log(`before create EcoinventActivityImpact`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('EcoinventActivityImpact created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('before EcoinventActivityImpact update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('EcoinventActivityImpact updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('before EcoinventActivityImpact delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof EcoinventActivityImpact, OrgContext>) {
		this.logger.log('EcoinventActivityImpact deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
