
// SurveyDatum Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { SurveyDatum } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class SurveyDatumHooks extends BaseSidecar {
	constructor() {
		super(SurveyDatum, 'survey_data');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('before SurveyDatum read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('SurveyDatum read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log(`before create SurveyDatum`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('SurveyDatum created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('before SurveyDatum update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('SurveyDatum updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('before SurveyDatum delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof SurveyDatum, OrgContext>) {
		this.logger.log('SurveyDatum deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
