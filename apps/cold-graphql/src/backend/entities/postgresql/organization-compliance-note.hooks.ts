// organization-compliance-note.hooks Sidecar - Entity hooks for organization
	import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

	import { OrgContext } from '../../acl_policies';
	import { WorkerLogger } from '../../libs/logger';
	import { OrganizationComplianceNote } from './organization-compliance-note';
	const logger = new WorkerLogger('organization-compliance-note')
		
	
	export const beforeCreateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterCreateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeReadHook = (params: ReadHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterReadHook = (params: ReadHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeUpdateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterUpdateHook = (params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeDeleteHook = (params: DeleteHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterDeleteHook = (params: DeleteHookParams<typeof OrganizationComplianceNote, OrgContext>) => {
		logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	