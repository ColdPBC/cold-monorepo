import { EcoinventActivityClassificationHooks } from '../hooks/ecoinvent-activity-classification.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Ref } from '@mikro-orm/core';
import { EcoinventActivity } from './ecoinvent-activity';
import { EcoinventClassification } from './ecoinvent-classification';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'ecoinvent_activity_classifications' })
export class EcoinventActivityClassification {
	sidecar: EcoinventActivityClassificationHooks;

	constructor() {
		this.sidecar = new EcoinventActivityClassificationHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => EcoinventActivity, ref: true, index: 'ecoinvent_activity_classifications_ecoinvent_activity_id_idx1' })
	ecoinventActivity!: Ref<EcoinventActivity>;

	@ManyToOne({ entity: () => EcoinventClassification, ref: true, index: 'ecoinvent_activity_classification_id_idx1' })
	ecoinventClassification!: Ref<EcoinventClassification>;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EcoinventActivityClassification, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EcoinventActivityClassificationHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
