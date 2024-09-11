import { SurveyDatumHooks } from './survey-datum.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { Organization } from './organization';
import { SurveyDefinition } from './survey-definition';
import { SurveyStatus } from './survey-status';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'survey_data' })
export class SurveyDatum {
	sidecar: SurveyDatumHooks;

	constructor() {
		this.sidecar = new SurveyDatumHooks();
	}

	@Unique({ name: 'survey_data_id_key' })
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => SurveyDefinition, ref: true, index: 'survey_data_survey_definition_id_idx' })
	surveyDefinition!: Ref<SurveyDefinition>;

	@OneToMany({ entity: () => SurveyStatus, mappedBy: 'surveyDatum' })
	surveyStatuses = new Collection<SurveyStatus>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SurveyDatum, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDatumHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
