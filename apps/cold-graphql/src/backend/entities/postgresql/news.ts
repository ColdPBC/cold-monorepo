import { NewsHooks } from '../hooks/news.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'news' })
export class News {
	sidecar: NewsHooks;

	constructor() {
		this.sidecar = new NewsHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'text' })
	url!: string;

	@Property({ type: 'text' })
	imageUrl!: string;

	@Property({ type: 'datetime', length: 3 })
	publishedAt!: Date;

	@Property({ type: 'text' })
	sourceName!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	publish = false;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof News, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof News, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new NewsHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
