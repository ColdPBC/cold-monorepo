import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { OrganizationFile } from './organization-file';
import { VectorRecord as OrmVectorRecord } from '../entities';
import { connection } from '../database';

@Entity<VectorRecord>('VectorRecord', {
	provider: new MikroBackendProvider(OrmVectorRecord, connection),
})
export class VectorRecord {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => GraphQLJSON)
	metadata!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<VectorRecord>(() => OrganizationFile, { id: (entity) => entity.organizationFile?.id, nullable: true })
	organizationFile?: OrganizationFile;

	@RelationshipField<VectorRecord>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => String, { nullable: true })
	url?: string;

	@Field(() => GraphQLJSON)
	values!: Record<string, unknown>;

	@Field(() => String)
	indexName!: string;

	@Field(() => String)
	namespace!: string;
}
