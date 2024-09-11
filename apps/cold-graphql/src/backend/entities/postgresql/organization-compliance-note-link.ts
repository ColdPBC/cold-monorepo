import { OrganizationComplianceNoteLinkHooks } from './organization-compliance-note-link.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationComplianceNote } from './organization-compliance-note';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_note_links' })
export class OrganizationComplianceNoteLink {
	sidecar: OrganizationComplianceNoteLinkHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceNoteLinkHooks();
	}

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

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteLinkHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
