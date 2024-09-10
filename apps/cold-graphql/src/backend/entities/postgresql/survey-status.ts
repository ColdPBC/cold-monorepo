import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './survey-status.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, Enum, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { SurveyDatum } from './survey-datum';
import { SurveyDefinition } from './survey-definition';

export enum SurveyStatusStatus {
	USER_SUBMITTED = 'user_submitted',
	COLD_SUBMITTED = 'cold_submitted',
	DRAFT = 'draft',
}

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'survey_status' })
export class SurveyStatus {
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
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof SurveyStatus, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
