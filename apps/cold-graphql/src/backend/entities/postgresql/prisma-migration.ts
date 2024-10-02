import { PrismaMigrationHooks } from '../hooks/prisma-migration.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(cold_admin_only)
@Entity({ tableName: '_prisma_migrations' })
export class PrismaMigration {
	sidecar: PrismaMigrationHooks;

	constructor() {
		this.sidecar = new PrismaMigrationHooks();
	}

	@PrimaryKey({ type: 'string', length: 36 })
	id!: string;

	@Property({ type: 'string', length: 64 })
	checksum!: string;

	@Property({ type: 'datetime', length: 6, nullable: true })
	finishedAt?: Date;

	@Property({ type: 'string', length: 255 })
	migrationName!: string;

	@Property({ type: 'text', nullable: true })
	logs?: string;

	@Property({ type: 'datetime', length: 6, nullable: true })
	rolledBackAt?: Date;

	@Property({ type: 'datetime', length: 6 })
	startedAt!: Date;

	@Property({ type: 'integer', default: 0 })
	appliedStepsCount = 0;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof PrismaMigration, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new PrismaMigrationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
