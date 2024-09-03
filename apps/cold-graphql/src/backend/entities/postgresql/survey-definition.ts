import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { SurveyDatum } from './survey-datum';
import { SurveyStatus } from './survey-status';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

export enum SurveyDefinitionsType {
  JOURNEY = 'JOURNEY',
  FOOTPRINT = 'FOOTPRINT',
  ENRICHMENT = 'ENRICHMENT',
  SOLUTION = 'SOLUTION',
  TEST = 'TEST',
  COMPLIANCE = 'COMPLIANCE',
}

@Entity({ tableName: 'survey_definitions' })
@ApplyAccessControlList(default_acl)
export class SurveyDefinition {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Unique({ name: 'survey_definitions_name_key' })
  @Property({ type: 'text' })
  name!: string;

  @Enum({ type: 'string', items: () => SurveyDefinitionsType })
  type!: SurveyDefinitionsType;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'json' })
  definition!: Record<string, unknown>;

  @OneToMany({ entity: () => SurveyDatum, mappedBy: 'surveyDefinition' })
  surveyData = new Collection<SurveyDatum>(this);

  @OneToMany({ entity: () => SurveyStatus, mappedBy: 'surveyDefinition' })
  surveyStatuses = new Collection<SurveyStatus>(this);
}
