import { EcoinventClassificationHooks } from '../hooks/ecoinvent-classification.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { EcoinventActivity } from './ecoinvent-activity';
import { EcoinventActivityClassification } from './ecoinvent-activity-classification';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_classifications' })
export class EcoinventClassification {
	sidecar: EcoinventClassificationHooks;

	constructor() {
		this.sidecar = new EcoinventClassificationHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Index({ name: 'ecoinvent_classifications_name_idx1' })
	@Property({ type: 'text' })
	name!: string;

	@Index({ name: 'ecoinvent_classifications_system_idx1' })
	@Property({ type: 'text' })
	system!: string;

	@Property({ type: 'text', nullable: true })
	description?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@OneToMany({ entity: () => EcoinventActivity, mappedBy: 'ecoinventClassification' })
	ecoinventActivities = new Collection<EcoinventActivity>(this);

	@OneToMany({ entity: () => EcoinventActivityClassification, mappedBy: 'ecoinventClassification' })
	ecoinventActivityClassifications = new Collection<EcoinventActivityClassification>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventClassificationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
