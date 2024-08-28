import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { CategoryDatum } from './category-datum';
import { CategoryDefinition as OrmCategoryDefinition } from '../entities';
import { connection } from '../database';

@Entity<CategoryDefinition>('CategoryDefinition', {
	provider: new MikroBackendProvider(OrmCategoryDefinition, connection),
})
export class CategoryDefinition {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	description!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => GraphQLJSON)
	definition!: Record<string, unknown>;

	@RelationshipField<CategoryDatum>(() => [CategoryDatum], { relatedField: 'categoryDefinition' })
	categoryData!: CategoryDatum[];
}
