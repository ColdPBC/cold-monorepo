import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Integration } from './integration';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { UtilityBill as OrmUtilityBill } from '../entities';
import { connection } from '../database';

@Entity<UtilityBill>('UtilityBill', {
	provider: new MikroBackendProvider(OrmUtilityBill, connection),
})
export class UtilityBill {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<UtilityBill>(() => Integration, { id: (entity) => entity.integration?.id })
	integration!: Integration;

	@Field(() => ISODateStringScalar)
	periodFrom!: Date;

	@Field(() => ISODateStringScalar)
	periodTo!: Date;

	@Field(() => GraphQLJSON)
	data!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<UtilityBill>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@RelationshipField<UtilityBill>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id })
	organizationFacility!: OrganizationFacility;

	@Field(() => Boolean)
	deleted = false;
}
