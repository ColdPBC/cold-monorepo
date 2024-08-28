import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ServiceDefinition } from './service-definition';
import { SupportedUtility as OrmSupportedUtility } from '../entities';
import { connection } from '../database';

@Entity<SupportedUtility>('SupportedUtility', {
	provider: new MikroBackendProvider(OrmSupportedUtility, connection),
})
export class SupportedUtility {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<SupportedUtility>(() => ServiceDefinition, { id: (entity) => entity.serviceDefinition?.id })
	serviceDefinition!: ServiceDefinition;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	label!: string;

	@Field(() => GraphQLJSON)
	data!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
