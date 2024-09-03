import { Entity, Field, ID, graphweaverMetadata } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ComponentDefinitionsType, ComponentDefinition as OrmComponentDefinition } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: ComponentDefinitionsType, name: 'ComponentDefinitionsType' });

@Entity<ComponentDefinition>('ComponentDefinition', {
	provider: new MikroBackendProvider(OrmComponentDefinition, connection),
})
export class ComponentDefinition {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => ComponentDefinitionsType)
	type!: string;

	@Field(() => String)
	description!: string;

	@Field(() => GraphQLJSON)
	definition!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
