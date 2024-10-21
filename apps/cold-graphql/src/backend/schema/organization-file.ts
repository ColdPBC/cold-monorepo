import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { Integration } from './integration';
import { Organization } from './organization';
import { OrganizationComplianceAiResponseFile } from './organization-compliance-ai-response-file';
import { OrganizationComplianceNoteFile } from './organization-compliance-note-file';
import { VectorRecord } from './vector-record';
import { OrganizationFilesType, OrganizationFile as OrmOrganizationFile } from '../entities';
import { connection } from '../database';
import { s3StorageProvider } from '../libs/providers/s3.provider';
import { MediaField } from '@exogee/graphweaver-storage-provider';

graphweaverMetadata.collectEnumInformation({ target: OrganizationFilesType, name: 'OrganizationFilesType' });

@Entity<OrganizationFile>('OrganizationFile', {
	provider: new MikroBackendProvider(OrmOrganizationFile, connection),
})
export class OrganizationFile {
	// "resourceId" must match the name of the field on the entity that gets the url from s3
	@MediaField({ storageProvider: s3StorageProvider })
	downloadUrl?: string;

	@MediaField({ storageProvider: s3StorageProvider })
	uploadUrl?: string;

	@MediaField({ storageProvider: s3StorageProvider })
	deleteUrl?: string;

	@Field(() => String, { nullable: true })
	bucket?: string;

	@Field(() => String, { nullable: true })
	key?: string;

	@Field(() => String)
	originalName!: string;

	@RelationshipField<OrganizationFile>(() => Organization, { id: entity => entity.organization?.id })
	organization!: Organization;

	@Field(() => String, { nullable: true })
	openaiAssistantId?: string;

	@Field(() => String, { nullable: true })
	openaiFileId?: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<OrganizationFile>(() => Integration, { id: entity => entity.integration?.id, nullable: true })
	integration?: Integration;

	@Field(() => String, { nullable: true })
	mimetype?: string;

	@Field(() => Number, { nullable: true })
	size?: number;

	@Field(() => String, { nullable: true })
	acl?: string;

	@Field(() => String, { nullable: true })
	contentType?: string;

	@Field(() => String, { nullable: true })
	encoding?: string;

	@Field(() => String, { nullable: true })
	fieldname?: string;

	@Field(() => String, { nullable: true })
	location?: string;

	@Field(() => String, { nullable: true })
	versionId?: string;

	@Field(() => String, { nullable: true })
	checksum?: string;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => String, { nullable: true })
	openaiVectorStoreId?: string;

	@Field(() => String, { nullable: true })
	openaiVectorFileStatus?: string;

	@Field(() => OrganizationFilesType)
	type: string = OrganizationFilesType.OTHER;

	@Field(() => ISODateStringScalar, { nullable: true })
	expiresAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	effectiveEndDate?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	effectiveStartDate?: Date;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => Boolean)
	visible = true;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'organizationFile' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => [OrganizationComplianceAiResponseFile], { relatedField: 'organizationFile' })
	organizationComplianceAiResponseFiles!: OrganizationComplianceAiResponseFile[];

	@RelationshipField<OrganizationComplianceNoteFile>(() => [OrganizationComplianceNoteFile], { relatedField: 'organizationFile' })
	organizationComplianceNoteFiles!: OrganizationComplianceNoteFile[];

	@RelationshipField<VectorRecord>(() => [VectorRecord], { relatedField: 'organizationFile' })
	vectorRecords!: VectorRecord[];
}
