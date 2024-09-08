import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-compliance-ai-response-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { Organization } from './organization';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'organization_compliance_ai_responses' })
export class OrganizationComplianceAiResponse {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	justification!: string;

	@Property({ type: 'json', nullable: true })
	references?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	sources?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_ai_response_compliance_question_id_idx1' })
	complianceQuestion!: Ref<ComplianceQuestion>;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'organization_compliance_ai_responses_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'json', nullable: true })
	answer?: Record<string, unknown>;

	@Property({ type: 'json', nullable: true })
	additionalContext?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organizationComplianceAiResponse' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);
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
