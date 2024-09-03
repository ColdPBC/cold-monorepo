import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Action } from './action';
import { ActionTemplate as OrmActionTemplate } from '../entities';
import { connection } from '../database';

@Entity<ActionTemplate>('ActionTemplate', {
	provider: new MikroBackendProvider(OrmActionTemplate, connection),
})
export class ActionTemplate {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => GraphQLJSON)
	template!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<Action>(() => [Action], { relatedField: 'actionTemplate' })
	actions!: Action[];
}
