import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { SurveyDatum } from './survey-datum';
import { SurveyDefinition } from './survey-definition';
import { SurveyStatusStatus, SurveyStatus as OrmSurveyStatus } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: SurveyStatusStatus, name: 'SurveyStatusStatus' });

@Entity<SurveyStatus>('SurveyStatus', {
	provider: new MikroBackendProvider(OrmSurveyStatus, connection),
})
export class SurveyStatus {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<SurveyStatus>(() => SurveyDefinition, { id: (entity) => entity.surveyDefinition?.id })
	surveyDefinition!: SurveyDefinition;

	@Field(() => String)
	surveyName!: string;

	@RelationshipField<SurveyStatus>(() => SurveyDatum, { id: (entity) => entity.surveyDatum?.id })
	surveyDatum!: SurveyDatum;

	@RelationshipField<SurveyStatus>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => SurveyStatusStatus)
	status!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => String)
	email!: string;
}
