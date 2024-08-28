import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Emission } from './emission';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { ServiceDefinition } from './service-definition';
import { UtilityBill } from './utility-bill';
import { Integration as OrmIntegration } from '../entities';
import { connection } from '../database';

@Entity<Integration>('Integration', {
	provider: new MikroBackendProvider(OrmIntegration, connection),
})
export class Integration {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<Integration>(() => ServiceDefinition, { id: (entity) => entity.serviceDefinition?.id })
	serviceDefinition!: ServiceDefinition;

	@RelationshipField<Integration>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => GraphQLJSON)
	metadata!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<Integration>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id, nullable: true })
	organizationFacility?: OrganizationFacility;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<Emission>(() => [Emission], { relatedField: 'integration' })
	emissions!: Emission[];

	@RelationshipField<OrganizationFile>(() => [OrganizationFile], { relatedField: 'integration' })
	organizationFiles!: OrganizationFile[];

	@RelationshipField<UtilityBill>(() => [UtilityBill], { relatedField: 'integration' })
	utilityBills!: UtilityBill[];
}
