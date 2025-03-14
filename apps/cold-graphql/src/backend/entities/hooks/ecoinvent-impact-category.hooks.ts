
// EcoinventImpactCategory Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EcoinventImpactCategory } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class EcoinventImpactCategoryHooks extends BaseSidecar {
	constructor() {
		super(EcoinventImpactCategory, 'ecoinvent_impact_categories');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('before EcoinventImpactCategory read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('EcoinventImpactCategory read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log(`before create EcoinventImpactCategory`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('EcoinventImpactCategory created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('before EcoinventImpactCategory update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('EcoinventImpactCategory updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('before EcoinventImpactCategory delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof EcoinventImpactCategory, OrgContext>) {
		this.logger.log('EcoinventImpactCategory deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
