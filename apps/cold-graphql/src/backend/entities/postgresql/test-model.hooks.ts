
// TestModel Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { TestModel } from './test-model';

export class TestModelHooks extends BaseSidecar {
	constructor() {
		super(TestModelHooks.name, TestModel);
	}
	
	async beforeReadHook(params: ReadHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('before TestModel read hook', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async afterReadHook(params: ReadHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('TestModel read', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('before TestModel create hook', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('TestModel created', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('before TestModel update hook', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('TestModel updated', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('before TestModel delete hook', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof TestModel, OrgContext>) {
		this.logger.log('TestModel deleted', { user: params.context.user, organization: params.context.organization, arguments: params.args });
		return params;
	}

}
