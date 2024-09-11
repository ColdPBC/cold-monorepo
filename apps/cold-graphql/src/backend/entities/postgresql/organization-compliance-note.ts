import { OrganizationComplianceNoteHooks } from './organization-compliance-note.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { OrganizationComplianceNoteLink } from './organization-compliance-note-link';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../libs/acls/acl_policies';
import { OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_notes' })
export class OrganizationComplianceNote {
	sidecar: OrganizationComplianceNoteHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceNoteHooks();
	}

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

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.beforeReadHook(params);
	}

	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.afterReadHook(params);
	}

	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.beforeUpdateHook(params);
	}

	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.afterUpdateHook(params);
	}

	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.beforeDeleteHook(params);
	}

	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		if (!this.sidecar) {
			this.sidecar = new OrganizationComplianceNoteHooks();
		}
		return await this.sidecar.afterDeleteHook(params);
	}
}
