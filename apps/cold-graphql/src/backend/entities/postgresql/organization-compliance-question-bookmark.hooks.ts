// organization-compliance-question-bookmark.hooks Sidecar - Entity hooks for organization
	import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

	import { OrgContext } from '../../acl_policies';
	import { WorkerLogger } from '../../libs/logger';
	import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
	const logger = new WorkerLogger('organization-compliance-question-bookmark')
		
	
	export const beforeCreateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterCreateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeReadHook = (params: ReadHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterReadHook = (params: ReadHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeUpdateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterUpdateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeDeleteHook = (params: DeleteHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterDeleteHook = (params: DeleteHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) => {
		logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	