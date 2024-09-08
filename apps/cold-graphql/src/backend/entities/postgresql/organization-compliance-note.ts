import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-compliance-note-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { OrganizationComplianceNoteLink } from './organization-compliance-note-link';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_notes' })
export class OrganizationComplianceNote {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	note!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_notes_compliance_question_id_idx' })
	complianceQuestion!: Ref<ComplianceQuestion>;

	@ManyToOne({ entity: () => OrganizationCompliance, ref: true, index: 'organization_compliance_notes_organization_compliance_id_idx' })
	organizationCompliance!: Ref<OrganizationCompliance>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@OneToMany({ entity: () => OrganizationComplianceNoteFile, mappedBy: 'organizationComplianceNote' })
	organizationComplianceNoteFiles = new Collection<OrganizationComplianceNoteFile>(this);

	@OneToMany({ entity: () => OrganizationComplianceNoteLink, mappedBy: 'organizationComplianceNote' })
	organizationComplianceNoteLinks = new Collection<OrganizationComplianceNoteLink>(this);
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
