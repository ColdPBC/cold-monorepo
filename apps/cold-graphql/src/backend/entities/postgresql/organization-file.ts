import { Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { Integration } from './integration';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { VectorRecord } from './vector-record';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

export enum OrganizationFilesType {
  CERTIFICATE = 'CERTIFICATE',
  TEST_RESULTS = 'TEST_RESULTS',
  STATEMENT = 'STATEMENT',
  ASSESSMENT = 'ASSESSMENT',
  POLICY = 'POLICY',
  OTHER = 'OTHER',
}

@Entity({ tableName: 'organization_files' })
export class OrganizationFile {
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

  @OneToMany({ entity: () => OrganizationClaim, mappedBy: 'organizationFile' })
  organizationClaims = new Collection<OrganizationClaim>(this);

  @OneToMany({ entity: () => OrganizationComplianceAiResponseFile, mappedBy: 'organizationFile' })
  organizationComplianceAiResponseFiles = new Collection<OrganizationComplianceAiResponseFile>(this);

  @OneToMany({ entity: () => OrganizationComplianceNoteFile, mappedBy: 'organizationFile' })
  organizationComplianceNoteFiles = new Collection<OrganizationComplianceNoteFile>(this);

  @OneToMany({ entity: () => VectorRecord, mappedBy: 'organizationFile' })
  vectorRecords = new Collection<VectorRecord>(this);
}
