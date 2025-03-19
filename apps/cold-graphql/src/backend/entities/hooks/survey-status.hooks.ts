
// SurveyStatus Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { SurveyStatus } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class SurveyStatusHooks extends BaseSidecar {
	constructor() {
		super(SurveyStatus, 'survey_status');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('before SurveyStatus read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('SurveyStatus read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log(`before create SurveyStatus`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('SurveyStatus created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('before SurveyStatus update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('SurveyStatus updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('before SurveyStatus delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
		this.logger.log('SurveyStatus deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
