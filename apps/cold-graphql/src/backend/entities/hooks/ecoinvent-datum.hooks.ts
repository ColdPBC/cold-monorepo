
// EcoinventDatum Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EcoinventDatum } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class EcoinventDatumHooks extends BaseSidecar {
	constructor() {
		super(EcoinventDatum, 'ecoinvent_data');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('before EcoinventDatum read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('EcoinventDatum read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log(`before create EcoinventDatum`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('EcoinventDatum created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('before EcoinventDatum update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('EcoinventDatum updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('before EcoinventDatum delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof EcoinventDatum, OrgContext>) {
		this.logger.log('EcoinventDatum deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
