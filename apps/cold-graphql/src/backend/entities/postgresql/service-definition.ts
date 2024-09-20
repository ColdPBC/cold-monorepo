import { ServiceDefinitionHooks } from './service-definition.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Integration } from './integration';
import { SupportedUtility } from './supported-utility';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only, OrgContext } from '../../libs/acls/acl_policies';

export enum ServiceDefinitionsType {
	PROVIDER = 'provider',
	PLATFORM = 'platform',
	CORE = 'core',
}

@ApplyAccessControlList(cold_admin_only)
@ApplyAccessControlList(cold_admin_only)
@Entity({ tableName: 'service_definitions' })
export class ServiceDefinition {
	sidecar: ServiceDefinitionHooks;

	constructor() {
		this.sidecar = new ServiceDefinitionHooks();
	}

	sidecar: ServiceDefinitionHooks;

	constructor() {
		this.sidecar = new ServiceDefinitionHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'service_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	label!: string;

	@Property({ type: 'json' })
	definition!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Enum({ type: 'string', items: () => ServiceDefinitionsType })
	type!: ServiceDefinitionsType;

	@OneToMany({ entity: () => Integration, mappedBy: 'serviceDefinition' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => SupportedUtility, mappedBy: 'serviceDefinition' })
	supportedUtilities = new Collection<SupportedUtility>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ServiceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ServiceDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
