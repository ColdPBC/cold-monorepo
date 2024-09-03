import { Entity, Enum, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { SurveyDatum } from './survey-datum';
import { SurveyDefinition } from './survey-definition';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

export enum SurveyStatusStatus {
  USER_SUBMITTED = 'user_submitted',
  COLD_SUBMITTED = 'cold_submitted',
  DRAFT = 'draft',
}

@Entity({ tableName: 'survey_status' })
@ApplyAccessControlList(default_acl)
export class SurveyStatus {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => SurveyDefinition, ref: true, fieldName: 'survey_id' })
  surveyDefinition!: Ref<SurveyDefinition>;

  @Property({ type: 'text' })
  surveyName!: string;

  @ManyToOne({ entity: () => SurveyDatum, ref: true, fieldName: 'survey_data_id' })
  surveyDatum!: Ref<SurveyDatum>;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'survey_status_organization_id_idx' })
  organization!: Ref<Organization>;

  @Enum({ type: 'string', items: () => SurveyStatusStatus })
  status!: SurveyStatusStatus;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'text' })
  email!: string;
}
