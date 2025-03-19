
// ClimatiqActvity Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ClimatiqActvity } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ClimatiqActvityHooks extends BaseSidecar {
	constructor() {
		super(ClimatiqActvity, 'climatiq_actvities');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('before ClimatiqActvity read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('ClimatiqActvity read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log(`before create ClimatiqActvity`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('ClimatiqActvity created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('before ClimatiqActvity update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('ClimatiqActvity updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('before ClimatiqActvity delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ClimatiqActvity, OrgContext>) {
		this.logger.log('ClimatiqActvity deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
