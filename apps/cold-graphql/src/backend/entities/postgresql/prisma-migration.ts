import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './prisma-migration.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@ApplyAccessControlList(cold_admin_only)
@Entity({ tableName: '_prisma_migrations' })
export class PrismaMigration {
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
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof PrismaMigration, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
