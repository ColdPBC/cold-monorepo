import { SurveyStatusHooks } from './survey-status.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, Enum, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { SurveyDatum } from './survey-datum';
import { SurveyDefinition } from './survey-definition';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

export enum SurveyStatusStatus {
	USER_SUBMITTED = 'user_submitted',
	COLD_SUBMITTED = 'cold_submitted',
	DRAFT = 'draft',
}

@ApplyAccessControlList(read_only_acl)
@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'survey_status' })
export class SurveyStatus {
	sidecar: SurveyStatusHooks;

	constructor() {
		this.sidecar = new SurveyStatusHooks();
	}

	sidecar: SurveyStatusHooks;

	constructor() {
		this.sidecar = new SurveyStatusHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => SurveyDefinition, ref: true, fieldName: 'survey_id' })
	surveyDefinition!: Ref<SurveyDefinition>;

	@Property({ type: 'text' })
	surveyName!: string;

	@ManyToOne({ entity: () => SurveyDatum, ref: true, fieldName: 'survey_data_id' })
	surveyDatum!: Ref<SurveyDatum>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'survey_status_organization_id_idx' })
	organization!: Ref<Organization>;

	@Enum({ type: 'string', items: () => SurveyStatusStatus })
	status!: SurveyStatusStatus;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'text' })
	email!: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyStatusHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
