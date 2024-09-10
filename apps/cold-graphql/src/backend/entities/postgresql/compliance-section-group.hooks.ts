// compliance-section-group.hooks Sidecar - Entity hooks for compliance
	import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

	import { OrgContext } from '../../acl_policies';
	import { WorkerLogger } from '../../libs/logger';
	import { ComplianceSectionGroup } from './compliance-section-group';
	const logger = new WorkerLogger('compliance-section-group')
		
	
	export const beforeCreateHook = (params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterCreateHook = (params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeReadHook = (params: ReadHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterReadHook = (params: ReadHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeUpdateHook = (params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterUpdateHook = (params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeDeleteHook = (params: DeleteHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterDeleteHook = (params: DeleteHookParams<typeof ComplianceSectionGroup, OrgContext>) => {
		logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	