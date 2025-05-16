import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { EprSubmission as OrmEprSubmission } from '../entities';
import { connection } from '../database';

@Entity<EprSubmission>('EprSubmission', {
	provider: new MikroBackendProvider(OrmEprSubmission, connection),
})
export class EprSubmission {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@RelationshipField<EprSubmission>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => String)
	status!: string;

	@Field(() => String)
	state!: string;

	@Field(() => String)
	billIdentifier!: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	dueDate?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	submittedAt?: Date;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;
}
