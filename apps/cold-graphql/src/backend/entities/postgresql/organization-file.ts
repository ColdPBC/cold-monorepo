import { OrganizationFileHooks } from '../hooks/organization-file.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { Integration } from './integration';
import { Organization } from './organization';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { VectorRecord } from './vector-record';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

export enum OrganizationFilesType {
	CERTIFICATE = 'CERTIFICATE',
	TEST_REPORT = 'TEST_REPORT',
	STATEMENT = 'STATEMENT',
	ASSESSMENT = 'ASSESSMENT',
	PURCHASE_ORDER = 'PURCHASE_ORDER',
	BILL_OF_MATERIALS = 'BILL_OF_MATERIALS',
	POLICY = 'POLICY',
	OTHER = 'OTHER',
	AUDIT_REPORT = 'AUDIT_REPORT',
	SCOPE_CERTIFICATE = 'SCOPE_CERTIFICATE',
	TRANSACTION_CERTIFICATE = 'TRANSACTION_CERTIFICATE',
	SUPPLIER_STATEMENT = 'SUPPLIER_STATEMENT',
	SUPPLIER_AGREEMENT = 'SUPPLIER_AGREEMENT',
}

export enum OrganizationFilesProcessingStatus {
	IMPORT_COMPLETE = 'IMPORT_COMPLETE',
	PROCESSING_ERROR = 'PROCESSING_ERROR',
	MANUAL_REVIEW = 'MANUAL_REVIEW',
	AI_PROCESSING = 'AI_PROCESSING',
}

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_files' })
export class OrganizationFile {
	sidecar: OrganizationFileHooks;

	constructor() {
		this.sidecar = new OrganizationFileHooks();
	}

	@Property({ type: 'text', nullable: true })
	bucket?: string;

	@Property({ type: 'text', nullable: true })
	key?: string;

	@Property({ type: 'text' })
	originalName!: string;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'text', nullable: true })
	openaiAssistantId?: string;

	@Unique({ name: 'organization_files_openai_file_id_key' })
	@Property({ type: 'text', nullable: true })
	openaiFileId?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Integration, ref: true, nullable: true, index: 'organization_files_integration_id_idx' })
	integration?: Ref<Integration>;

	@Property({ type: 'text', nullable: true })
	mimetype?: string;

	@Property({ type: 'integer', nullable: true })
	size?: number;

	@Property({ type: 'text', nullable: true })
	acl?: string;

	@Property({ fieldName: 'contentType', type: 'text', nullable: true })
	contentType?: string;

	@Property({ type: 'text', nullable: true })
	encoding?: string;

	@Property({ type: 'text', nullable: true })
	fieldname?: string;

	@Property({ type: 'text', nullable: true })
	location?: string;

	@Property({ fieldName: 'versionId', type: 'text', nullable: true })
	versionId?: string;

	@Property({ type: 'text', nullable: true })
	checksum?: string;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'text', nullable: true })
	openaiVectorStoreId?: string;

	@Property({ type: 'text', nullable: true })
	openaiVectorFileStatus?: string;

	@Enum({ type: 'string', items: () => OrganizationFilesType, default: 'OTHER' })
	type: OrganizationFilesType = OrganizationFilesType.OTHER;

	@Property({ type: 'datetime', length: 3, nullable: true })
	expiresAt?: Date;

	@Property({ type: 'datetime', length: 3, nullable: true })
	effectiveEndDate?: Date;

	@Property({ type: 'datetime', length: 3, nullable: true })
	effectiveStartDate?: Date;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'boolean', default: true })
	visible = true;

	@Enum({ type: 'string', items: () => OrganizationFilesProcessingStatus, nullable: true })
	processingStatus?: OrganizationFilesProcessingStatus;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'organizationFile' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organizationFile' })
	organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);

	@OneToMany({ entity: () => OrganizationComplianceNoteFile, mappedBy: 'organizationFile' })
	organizationComplianceNoteFiles = new Collection<OrganizationComplianceNoteFile>(this);

	@OneToMany({ entity: () => VectorRecord, mappedBy: 'organizationFile' })
	vectorRecords = new Collection<VectorRecord>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationFile, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFileHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
