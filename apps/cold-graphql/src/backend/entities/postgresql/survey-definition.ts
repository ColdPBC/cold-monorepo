import { SurveyDefinitionHooks } from './survey-definition.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

export enum SurveyDefinitionsType {
	JOURNEY = 'JOURNEY',
	FOOTPRINT = 'FOOTPRINT',
	ENRICHMENT = 'ENRICHMENT',
	SOLUTION = 'SOLUTION',
	TEST = 'TEST',
	COMPLIANCE = 'COMPLIANCE',
}

@ApplyAccessControlList(read_only_acl)
@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'survey_definitions' })
export class SurveyDefinition {
	sidecar: SurveyDefinitionHooks;

	constructor() {
		this.sidecar = new SurveyDefinitionHooks();
	}

	sidecar: SurveyDefinitionHooks;

	constructor() {
		this.sidecar = new SurveyDefinitionHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'survey_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Enum({ type: 'string', items: () => SurveyDefinitionsType })
	type!: SurveyDefinitionsType;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json' })
	definition!: Record<string, unknown>;

	@OneToMany({ entity: () => SurveyDatum, mappedBy: 'surveyDefinition' })
	surveyData = new Collection<SurveyDatum>(this);

	@OneToMany({ entity: () => SurveyStatus, mappedBy: 'surveyDefinition' })
	surveyStatuses = new Collection<SurveyStatus>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SurveyDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new SurveyDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
