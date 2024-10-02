// Product Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { Product } from '../postgresql';
import { setEntityDefaults } from '../../libs/utilities/entity_utils';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';

export class ProductHooks extends BaseSidecar {
	constructor() {
		super(ProductHooks.name, Product);
	}

	async beforeReadHook(params: ReadHookParams<typeof Product, OrgContext>) {
		this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof Product, OrgContext>) {
		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		this.logger.log(`before create product hook`, { user: params.context.user, arguments: params.args });

		const { context, args } = params;

		setEntityDefaults(args, GuidPrefixes.Product);

		console.log(args);

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if (!params.context.user.isColdAdmin) {
				set(item, 'organization.id', params.context.user.organization.id);
			}
			set(item, 'updatedAt', new Date());
		}
		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof Product, OrgContext>) {
		this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof Product, OrgContext>) {
		this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof Product, OrgContext>) {
		this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}
}
