import { Entity, Field, ID } from '@exogee/graphweaver';
import { GraphQLJSON } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ClimatiqActvity as OrmClimatiqActvity } from '../entities';
import { connection } from '../database';

@Entity<ClimatiqActvity>('ClimatiqActvity', {
	provider: new MikroBackendProvider(OrmClimatiqActvity, connection),
})
export class ClimatiqActvity {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String)
	activityId!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	category!: string;

	@Field(() => String)
	sector!: string;

	@Field(() => String)
	source!: string;

	@Field(() => String)
	sourceLink!: string;

	@Field(() => String)
	sourceDataset!: string;

	@Field(() => Number)
	year!: number;

	@Field(() => Number)
	yearReleased!: number;

	@Field(() => String)
	region!: string;

	@Field(() => String)
	regionName!: string;

	@Field(() => String)
	description!: string;

	@Field(() => String)
	unitType!: string;

	@Field(() => String, { nullable: true })
	unit?: string;

	@Field(() => String)
	sourceLcaActivity!: string;

	@Field(() => GraphQLJSON)
	dataQualityFlags!: Record<string, unknown>;

	@Field(() => String)
	accessType!: string;

	@Field(() => GraphQLJSON)
	supportedCalculationMethods!: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	factor?: string;

	@Field(() => String, { nullable: true })
	factorCalculationMethod?: string;

	@Field(() => GraphQLJSON, { nullable: true })
	constituentGases?: Record<string, unknown>;

	@Field(() => GraphQLJSON)
	dataVersion!: Record<string, unknown>;

	@Field(() => GraphQLJSON)
	dataVersionInformation!: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	factorCalculationOrigin?: string;

	@Field(() => Number, { nullable: true })
	uncertainty?: number;
}
