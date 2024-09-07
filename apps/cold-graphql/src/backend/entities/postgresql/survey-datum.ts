import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { Organization } from './organization';
import { SurveyDefinition } from './survey-definition';
import { SurveyStatus } from './survey-status';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'survey_data' })
export class SurveyDatum {
	@Unique({ name: 'survey_data_id_key' })
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => SurveyDefinition, ref: true, index: 'survey_data_survey_definition_id_idx' })
	surveyDefinition!: Ref<SurveyDefinition>;

	@OneToMany({ entity: () => SurveyStatus, mappedBy: 'surveyDatum' })
	surveyStatuses = new Collection<SurveyStatus>(this);
}
