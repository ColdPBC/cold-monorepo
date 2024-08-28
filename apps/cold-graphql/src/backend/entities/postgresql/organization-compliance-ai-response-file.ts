import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationComplianceAiResponse } from './organization-compliance-ai-response';
import { OrganizationFile } from './organization-file';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';

@Entity({ tableName: 'organization_compliance_ai_response_files' })
@ApplyAccessControlList(default_acl)
export class OrganizationComplianceAiResponseFile {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @ManyToOne({ entity: () => OrganizationFile, ref: true, fieldName: 'organization_files_id', index: 'organization_compliance_ai_response__organization_files_id_idx1' })
  organizationFile!: Ref<OrganizationFile>;

  @ManyToOne({ entity: () => OrganizationComplianceAiResponse, ref: true, index: 'organization_compliance_ai_re_organization_compliance_ai_r_idx1' })
  organizationComplianceAiResponse!: Ref<OrganizationComplianceAiResponse>;

  @ManyToOne({ entity: () => OrganizationCompliance, ref: true })
  organizationCompliance!: Ref<OrganizationCompliance>;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'organization_compliance_ai_response_files_organization_id_idx' })
  organization!: Ref<Organization>;

  @Property({ type: 'boolean', default: false })
  deleted = false;
}
