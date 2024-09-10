import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-compliance-note-link.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationComplianceNote } from './organization-compliance-note';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_note_links' })
export class OrganizationComplianceNoteLink {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	url!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => OrganizationComplianceNote, ref: true, index: 'organization_compliance_note__organization_compliance_note_idx1' })
	organizationComplianceNote!: Ref<OrganizationComplianceNote>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
