import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationFile } from './organization-file';
import { OrganizationComplianceAiResponseFile as OrmOrganizationComplianceAiResponseFile } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceAiResponseFile>('OrganizationComplianceAiResponseFile', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceAiResponseFile, connection),
})
export class OrganizationComplianceAiResponseFile {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id })
	organizationFile!: OrganizationFile;

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => OrganizationComplianceAiResponse, { id: (entity) => entity.organizationComplianceAiResponse?.id })
	organizationComplianceAiResponse!: OrganizationComplianceAiResponse;

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => OrganizationCompliance, { id: (entity) => entity.organizationCompliance?.id })
	organizationCompliance!: OrganizationCompliance;

	@RelationshipField<OrganizationComplianceAiResponseFile>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => Boolean)
	deleted = false;
}
