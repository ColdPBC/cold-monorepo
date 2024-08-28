import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Integration } from './integration';
import { SupportedUtility } from './supported-utility';
import { ServiceDefinitionsType, ServiceDefinition as OrmServiceDefinition } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: ServiceDefinitionsType, name: 'ServiceDefinitionsType' });

@Entity<ServiceDefinition>('ServiceDefinition', {
	provider: new MikroBackendProvider(OrmServiceDefinition, connection),
})
export class ServiceDefinition {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	label!: string;

	@Field(() => GraphQLJSON)
	definition!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => ServiceDefinitionsType)
	type!: string;

	@RelationshipField<ServiceDefinition>(() => Integration, { id: (entity) => entity.serviceDefinitionInverse?.id })
	serviceDefinitionInverse?: Integration;

	@RelationshipField<SupportedUtility>(() => [SupportedUtility], { relatedField: 'serviceDefinition' })
	supportedUtilities!: SupportedUtility[];
}
