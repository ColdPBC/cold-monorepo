import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { OrganizationCompliance } from './organization-compliance';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_compliance_question_bookmarks' })
export class OrganizationComplianceQuestionBookmark {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @ManyToOne({ entity: () => ComplianceQuestion, ref: true, index: 'organization_compliance_question_bo_compliance_question_id_idx1' })
  complianceQuestion!: Ref<ComplianceQuestion>;

  @ManyToOne({ entity: () => OrganizationCompliance, ref: true, index: 'organization_compliance_questio_organization_compliance_id_idx1' })
  organizationCompliance!: Ref<OrganizationCompliance>;

  @Property({ type: 'boolean', default: false })
  deleted = false;
}
