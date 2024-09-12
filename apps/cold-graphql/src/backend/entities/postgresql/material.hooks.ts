// Material Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { Material } from './material';

export class MaterialHooks extends BaseSidecar {
	constructor() {
		super(MaterialHooks.name, Material);
	}

	async beforeReadHook(params: ReadHookParams<typeof Material, OrgContext>) {
		this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof Material, OrgContext>) {
		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		this.logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });

		for (const item of params.args.items) {
			if (!params.context.user.isColdAdmin) {
				set(item, 'organization.id', params.context.user.organization.id);
			}
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof Material, OrgContext>) {
		this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof Material, OrgContext>) {
		this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof Material, OrgContext>) {
		this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}
}
