
// UtilityBill Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { UtilityBill } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class UtilityBillHooks extends BaseSidecar {
	constructor() {
		super(UtilityBill, 'utility_bills');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('before UtilityBill read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('UtilityBill read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log(`before create UtilityBill`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('UtilityBill created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('before UtilityBill update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('UtilityBill updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('before UtilityBill delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof UtilityBill, OrgContext>) {
		this.logger.log('UtilityBill deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
