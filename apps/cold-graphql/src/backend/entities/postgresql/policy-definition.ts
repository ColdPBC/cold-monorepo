import { PolicyDefinitionHooks } from './policy-definition.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { PolicyDatum } from './policy-datum';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'policy_definitions' })
export class PolicyDefinition {
	sidecar: PolicyDefinitionHooks;

	constructor() {
		this.sidecar = new PolicyDefinitionHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	definition!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@OneToMany({ entity: () => PolicyDatum, mappedBy: 'policyDefinition' })
	policyData = new Collection<PolicyDatum>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof PolicyDefinition, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new PolicyDefinitionHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
