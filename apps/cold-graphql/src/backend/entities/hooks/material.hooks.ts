// Material Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Material } from '../postgresql';
import { cache_pcf_emissions } from '../../schema/queries/pcf-emissions-by-product';
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
		await super.afterCreateHook(params);
		cache_pcf_emissions(params.context);

		return params;
	}

	// Overrride BeforeUpdateHook here:

	// Overrride AfterUpdateHook here:
	override async afterUpdateHook(params: CreateOrUpdateHookParams<Material, OrgContext>) {
		await super.afterUpdateHook(params);
		cache_pcf_emissions(params.context);

		return params;
	}
	// Overrride BeforeDeleteHook here:

	// Overrride AfterDeleteHook here:
	override async afterDeleteHook(params: DeleteHookParams<Material, OrgContext>) {
		await super.afterDeleteHook(params);
		cache_pcf_emissions(params.context);

		return params;
	}
}
