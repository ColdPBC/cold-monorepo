import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { SurveyDefinition } from './survey-definition';
import { SurveyStatus } from './survey-status';
import { SurveyDatum as OrmSurveyDatum } from '../entities';
import { connection } from '../database';

@Entity<SurveyDatum>('SurveyDatum', {
	provider: new MikroBackendProvider(OrmSurveyDatum, connection),
})
export class SurveyDatum {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<SurveyDatum>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => GraphQLJSON)
	data!: Record<string, unknown>;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<SurveyDatum>(() => SurveyDefinition, { id: (entity) => entity.surveyDefinition?.id })
	surveyDefinition!: SurveyDefinition;

	@RelationshipField<SurveyStatus>(() => [SurveyStatus], { relatedField: 'surveyDatum' })
	surveyStatuses!: SurveyStatus[];
}
