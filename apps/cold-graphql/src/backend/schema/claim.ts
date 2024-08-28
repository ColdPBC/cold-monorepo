import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import { ClaimsLevel, ClaimsType, Claim as OrmClaim } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: ClaimsType, name: 'ClaimsType' });
graphweaverMetadata.collectEnumInformation({ target: ClaimsLevel, name: 'ClaimsLevel' });

@Entity<Claim>('Claim', {
	provider: new MikroBackendProvider(OrmClaim, connection),
})
export class Claim {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<Claim>(() => Organization, { id: (entity) => entity.organization?.id, nullable: true })
	organization?: Organization;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => ClaimsType)
	type!: string;

	@Field(() => ClaimsLevel)
	level!: string;

	@RelationshipField<OrganizationClaim>(() => [OrganizationClaim], { relatedField: 'claim' })
	organizationClaims!: OrganizationClaim[];
}
