import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-compliance-response.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_responses' })
export class OrganizationComplianceResponse {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_responses_compliance_question_id_idx' })
	complianceQuestion!: Ref<ComplianceQuestion>;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@Property({ type: 'json', nullable: true })
	additionalContext?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	value?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
