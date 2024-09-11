// PolicyDefinition Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { PolicyDefinition } from './policy-definition';

export const beforeReadHook = async (params: ReadHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterReadHook = async (params: ReadHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
	return params;
};
export const beforeCreateHook = async (params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterCreateHook = async (params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeUpdateHook = async (params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterUpdateHook = async (params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeDeleteHook = async (params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterDeleteHook = async (params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) => {
	//this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
	return params;
};
