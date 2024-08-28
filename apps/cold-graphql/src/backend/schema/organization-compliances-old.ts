import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';
import { OrganizationCompliancesOld as OrmOrganizationCompliancesOld } from '../entities';
import { connection } from '../database';

@Entity<OrganizationCompliancesOld>('OrganizationCompliancesOld', {
	provider: new MikroBackendProvider(OrmOrganizationCompliancesOld, connection),
})
export class OrganizationCompliancesOld {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<OrganizationCompliancesOld>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@RelationshipField<OrganizationCompliancesOld>(() => ComplianceDefinition, { id: (entity) => entity.complianceDefinition?.id })
	complianceDefinition!: ComplianceDefinition;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => GraphQLJSON, { nullable: true })
	surveysOverride?: Record<string, unknown>;

	@Field(() => Boolean)
	deleted = false;
}
