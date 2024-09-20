import { OrganizationComplianceHooks } from './organization-compliance.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceNote } from './organization-compliance-note';
import { OrganizationComplianceQuestionBookmark } from './organization-compliance-question-bookmark';
import { OrganizationComplianceResponse } from './organization-compliance-response';
import { OrganizationComplianceStatus } from './organization-compliance-status';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliance' })
export class OrganizationCompliance {
	sidecar: OrganizationComplianceHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceHooks();
	}

	sidecar: OrganizationComplianceHooks;

	constructor() {
		this.sidecar = new OrganizationComplianceHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'boolean', default: true })
	visible = true;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'organization_compliance_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organizationCompliance' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponse, mappedBy: 'organizationCompliance' })
	organizationComplianceAiResponses = new Collection<OrganizationComplianceAiResponse>(this);

	@OneToMany({ entity: () => OrganizationComplianceNote, mappedBy: 'organizationCompliance' })
	organizationComplianceNotes = new Collection<OrganizationComplianceNote>(this);

	@OneToMany({ entity: () => OrganizationComplianceQuestionBookmark, mappedBy: 'organizationCompliance' })
	organizationComplianceQuestionBookmarks = new Collection<OrganizationComplianceQuestionBookmark>(this);

	@OneToMany({ entity: () => OrganizationComplianceResponse, mappedBy: 'organizationCompliance' })
	organizationComplianceResponses = new Collection<OrganizationComplianceResponse>(this);

	@OneToMany({ entity: () => OrganizationComplianceStatus, mappedBy: 'organizationCompliance' })
	organizationComplianceStatuses = new Collection<OrganizationComplianceStatus>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationCompliance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationComplianceHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
