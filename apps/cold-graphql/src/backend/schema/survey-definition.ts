import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';
import { SurveyDefinitionsType, SurveyDefinition as OrmSurveyDefinition } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: SurveyDefinitionsType, name: 'SurveyDefinitionsType' });

@Entity<SurveyDefinition>('SurveyDefinition', {
	provider: new MikroBackendProvider(OrmSurveyDefinition, connection),
})
export class SurveyDefinition {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => SurveyDefinitionsType)
	type!: string;

	@Field(() => String)
	description!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => GraphQLJSON)
	definition!: Record<string, unknown>;

	@RelationshipField<SurveyDatum>(() => [SurveyDatum], { relatedField: 'surveyDefinition' })
	surveyData!: SurveyDatum[];

	@RelationshipField<SurveyStatus>(() => [SurveyStatus], { relatedField: 'surveyDefinition' })
	surveyStatuses!: SurveyStatus[];
}
