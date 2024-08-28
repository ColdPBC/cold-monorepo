import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { ActionTemplate } from './action-template';
import { Organization } from './organization';
import { Action as OrmAction } from '../entities';
import { connection } from '../database';

@Entity<Action>('Action', {
	provider: new MikroBackendProvider(OrmAction, connection),
})
export class Action {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => GraphQLJSON)
	action!: Record<string, unknown>;

	@RelationshipField<Action>(() => ActionTemplate, { id: (entity) => entity.actionTemplate?.id })
	actionTemplate!: ActionTemplate;

	@RelationshipField<Action>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
