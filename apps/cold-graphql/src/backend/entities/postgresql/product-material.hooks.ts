// ProductMaterial Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { ProductMaterial } from './product-material';

export class ProductMaterialHooks extends BaseSidecar {
	constructor() {
		super(ProductMaterialHooks.name, ProductMaterial);
	}

	async beforeReadHook(params: ReadHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });

		for (const item of params.args.items) {
			set(item, 'updated_at', new Date());
			set(item, 'created_at', new Date());
		}

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });

		for (const item of params.args.items) {
			set(item, 'updated_at', new Date());
		}

		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof ProductMaterial, OrgContext>) {
		this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}
}
