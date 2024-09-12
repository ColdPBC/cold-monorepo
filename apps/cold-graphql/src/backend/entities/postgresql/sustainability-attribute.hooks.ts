// SustainabilityAttribute Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { SustainabilityAttribute } from './sustainability-attribute';
import { set } from 'lodash';

export class SustainabilityAttributeHooks extends BaseSidecar {
	constructor() {
		super(SustainabilityAttributeHooks.name, SustainabilityAttribute);
	}

	async beforeReadHook(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		if (!params.context.user.isColdAdmin) {
			for (const item of params.args.items) {
				set(item, 'organization.id', params.context.user.organization.id);
				set(item, 'updated_at', new Date());
				set(item, 'created_at', new Date());
			}
		}

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}

		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}
}
