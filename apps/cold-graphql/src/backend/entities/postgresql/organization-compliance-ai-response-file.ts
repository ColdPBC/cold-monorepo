import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-compliance-ai-response-file-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationFile } from './organization-file';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'organization_compliance_ai_response_files' })
export class OrganizationComplianceAiResponseFile {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => OrganizationFile, ref: true, fieldName: 'organization_files_id', index: 'organization_compliance_ai_response__organization_files_id_idx1' })
	organizationFile!: Ref<OrganizationFile>;

	@ManyToOne({ entity: () => OrganizationComplianceAiResponse, ref: true, index: 'organization_compliance_ai_re_organization_compliance_ai_r_idx1' })
	organizationComplianceAiResponse!: Ref<OrganizationComplianceAiResponse>;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'organization_compliance_ai_response_files_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
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
