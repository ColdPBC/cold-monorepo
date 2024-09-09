// policy-definition-hooks.ts Sidecar - Entity hooks for policy
	import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

	import { OrgContext } from '../../acl_policies';
	import { WorkerLogger } from '../../libs/logger';
	const logger = new WorkerLogger('policy-definition-hooks')
		
		
	export const beforeCreateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
		logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const afterCreateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
		logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const beforeReadHook = (params: ReadHookParams<unknown, OrgContext>) => {
		logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const afterReadHook = (params: ReadHookParams<unknown, OrgContext>) => {
		logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const beforeUpdateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
		logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const afterUpdateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
		logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const beforeDeleteHook = (params: DeleteHookParams<unknown, OrgContext>) => {
		logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

		
	export const afterDeleteHook = (params: DeleteHookParams<unknown, OrgContext>) => {
		logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	