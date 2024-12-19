// Material Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams, ResolverOptions } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Material } from '../postgresql';
import { cache_pcf_emissions } from '../../services/emissions/cache_pcf_emissions';
import { MqttActionEnum, MqttStatusEnum } from '../../libs/mqtt/mqtt.service';

export class MaterialHooks extends BaseSidecar {
	constructor() {
		super(Material, 'materials');
	}

	// Overrride BeforeReadHook here:

	// Overrride AfterReadHook here:

	// Overrride BeforeCreateHook here:

	// Overrride AfterCreateHook here:
	override async afterCreateHook(params: CreateOrUpdateHookParams<Material, OrgContext>) {
		//await this.cache_emissions(params);
		await super.afterCreateHook(params);

		return params;
	}

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:
	override async afterUpdateHook(params: CreateOrUpdateHookParams<Material, OrgContext>) {
		//await cache_pcf_emissions(params);
		//await super.afterUpdateHook(params);

		return params;
	}
	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
	override async afterDeleteHook(params: DeleteHookParams<Material, OrgContext>) {
		//await cache_pcf_emissions(params);
		//await super.afterDeleteHook(params);

		return params;
	}
}
