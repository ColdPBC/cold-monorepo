// organization-hooks.ts Sidecar - Entity hooks for organization
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { OrgContext } from '../../acl_policies';
import { ConsoleLogger } from '@nestjs/common';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { action } from '@storybook/addon-actions';

const logger = new ConsoleLogger('organization-hooks');
const mqttService = new MqttService('organization-hooks');

export const beforeCreateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterCreateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeReadHook = async (params: ReadHookParams<unknown, OrgContext>) => {
	logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterReadHook = async (params: ReadHookParams<unknown, OrgContext>) => {
	logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
	const payload: MQTTPayloadType = {
		action: 'get',
		status: 'complete',
		swr_key: '',
		org_id: params.context.user.org_id,
		data: params.entities,
	};
	await Promise.all([
		mqttService.connect(params.context),
		mqttService.publishMQTT(payload, {
			user: params.context.user,
			arguments: params.args,
		}),
	]);
	return params;
};

export const beforeUpdateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterUpdateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const beforeDeleteHook = (params: DeleteHookParams<unknown, OrgContext>) => {
	logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
	return params;
};

export const afterDeleteHook = (params: DeleteHookParams<unknown, OrgContext>) => {
	logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
	return params;
};
