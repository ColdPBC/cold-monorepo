// action.hooks Sidecar - Entity hooks for action.hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { OrgContext } from '../../acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { Action } from './action';
const logger = new WorkerLogger('action');

export const beforeCreateHook = (params: CreateOrUpdateHookParams<typeof Action, OrgContext>) => {
	logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterCreateHook = (params: CreateOrUpdateHookParams<typeof Action, OrgContext>) => {
	logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeReadHook = (params: ReadHookParams<typeof Action, OrgContext>) => {
	logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterReadHook = (params: ReadHookParams<typeof Action, OrgContext>) => {
	logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeUpdateHook = (params: CreateOrUpdateHookParams<typeof Action, OrgContext>) => {
	logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterUpdateHook = (params: CreateOrUpdateHookParams<typeof Action, OrgContext>) => {
	logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeDeleteHook = (params: DeleteHookParams<typeof Action, OrgContext>) => {
	logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterDeleteHook = (params: DeleteHookParams<typeof Action, OrgContext>) => {
	logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
	return params;
};
