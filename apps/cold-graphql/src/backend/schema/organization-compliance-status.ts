import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceStatus as OrmOrganizationComplianceStatus } from '../entities';
import { connection } from '../database';

@Entity<OrganizationComplianceStatus>('OrganizationComplianceStatus', {
	provider: new MikroBackendProvider(OrmOrganizationComplianceStatus, connection),
})
export class OrganizationComplianceStatus {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	type!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String)
	email!: string;

	@RelationshipField<OrganizationComplianceStatus>(() => OrganizationCompliance, { id: (entity) => entity.organizationCompliance?.id })
	organizationCompliance!: OrganizationCompliance;

	@Field(() => Boolean)
	deleted = false;
}
