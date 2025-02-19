
// PolicyDatum Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { PolicyDatum } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class PolicyDatumHooks extends BaseSidecar {
	constructor() {
		super(PolicyDatum, 'policy_data');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('before PolicyDatum read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log(`before create PolicyDatum`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('before PolicyDatum update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('before PolicyDatum delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof PolicyDatum, OrgContext>) {
		this.logger.log('PolicyDatum deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
