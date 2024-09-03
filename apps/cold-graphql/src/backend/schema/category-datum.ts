import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { CategoryDefinition } from './category-definition';
import { Organization } from './organization';
import { CategoryDatum as OrmCategoryDatum } from '../entities';
import { connection } from '../database';

@Entity<CategoryDatum>('CategoryDatum', {
	provider: new MikroBackendProvider(OrmCategoryDatum, connection),
})
export class CategoryDatum {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<CategoryDatum>(() => CategoryDefinition, { id: (entity) => entity.categoryDefinition?.id })
	categoryDefinition!: CategoryDefinition;

	@RelationshipField<CategoryDatum>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => GraphQLJSON)
	data!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
