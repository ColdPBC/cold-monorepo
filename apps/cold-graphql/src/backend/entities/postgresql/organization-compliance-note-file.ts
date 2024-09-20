import { OrganizationComplianceNoteFileHooks } from './organization-compliance-note-file.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationFile } from './organization-file';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance_note_files' })
export class OrganizationComplianceNoteFile {
	sidecar: OrganizationComplianceNoteFileHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceNoteFileHooks();
	}

	sidecar: OrganizationComplianceNoteFileHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceNoteFileHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => OrganizationComplianceNote, ref: true, index: 'organization_compliance_note__organization_compliance_note__idx' })
	organizationComplianceNote!: Ref<OrganizationComplianceNote>;

	@ManyToOne({ entity: () => OrganizationFile, ref: true, fieldName: 'organization_files_id', index: 'organization_compliance_note_files_organization_files_id_idx' })
	organizationFile!: Ref<OrganizationFile>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceNoteFileHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
