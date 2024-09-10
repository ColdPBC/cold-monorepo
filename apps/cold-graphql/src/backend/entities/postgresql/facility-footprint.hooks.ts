// facility-footprint.hooks Sidecar - Entity hooks for facility
	import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

	import { OrgContext } from '../../acl_policies';
	import { WorkerLogger } from '../../libs/logger';
	import { FacilityFootprint } from './facility-footprint';
	const logger = new WorkerLogger('facility-footprint')
		
	
	export const beforeCreateHook = (params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterCreateHook = (params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeReadHook = (params: ReadHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterReadHook = (params: ReadHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeUpdateHook = (params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterUpdateHook = (params: CreateOrUpdateHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const beforeDeleteHook = (params: DeleteHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	
	export const afterDeleteHook = (params: DeleteHookParams<typeof FacilityFootprint, OrgContext>) => {
		logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	