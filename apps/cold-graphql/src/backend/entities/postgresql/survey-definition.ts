import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './survey-definition-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';

export enum SurveyDefinitionsType {
	JOURNEY = 'JOURNEY',
	FOOTPRINT = 'FOOTPRINT',
	ENRICHMENT = 'ENRICHMENT',
	SOLUTION = 'SOLUTION',
	TEST = 'TEST',
	COMPLIANCE = 'COMPLIANCE',
}

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'survey_definitions' })
export class SurveyDefinition {
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
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
