import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EmissionFactor } from './emission-factor';
import { Integration } from './integration';
import { OrganizationFacility } from './organization-facility';
import { Emission as OrmEmission } from '../entities';
import { connection } from '../database';

@Entity<Emission>('Emission', {
	provider: new MikroBackendProvider(OrmEmission, connection),
})
export class Emission {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<Emission>(() => Integration, { id: (entity) => entity.integration?.id })
	integration!: Integration;

	@Field(() => GraphQLJSON)
	activityData!: Record<string, unknown>;

	@Field(() => GraphQLJSON)
	integrationData!: Record<string, unknown>;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	region!: string;

	@Field(() => String)
	category!: string;

	@Field(() => Number)
	co2e!: number;

	@Field(() => String)
	co2eCalculationOrigin!: string;

	@Field(() => String)
	co2eUnit!: string;

	@Field(() => GraphQLJSON)
	emissionFactor!: Record<string, unknown>;

	@Field(() => String)
	co2CalculationMethod!: string;

	@Field(() => GraphQLJSON)
	constituentGases!: Record<string, unknown>;

	@RelationshipField<Emission>(() => OrganizationFacility, { id: (entity) => entity.organizationFacility?.id })
	organizationFacility!: OrganizationFacility;

	@Field(() => Boolean)
	deleted = false;

	@RelationshipField<Emission>(() => EmissionFactor, { id: (entity) => entity.emissionFactor?.id, nullable: true })
	emissionFactor?: EmissionFactor;
}
