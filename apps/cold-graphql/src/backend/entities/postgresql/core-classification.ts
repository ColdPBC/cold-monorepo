import { CoreClassificationHooks } from '../hooks/core-classification.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { MaterialClassification } from './material-classification';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'core_classifications' })
export class CoreClassification {
	sidecar: CoreClassificationHooks;

	constructor() {
		this.sidecar = new CoreClassificationHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@OneToMany({ entity: () => MaterialClassification, mappedBy: 'coreClassification' })
	materialClassifications = new Collection<MaterialClassification>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof CoreClassification, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof CoreClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new CoreClassificationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
