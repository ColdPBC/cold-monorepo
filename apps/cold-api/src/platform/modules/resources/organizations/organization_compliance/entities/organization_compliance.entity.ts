import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../../entities/organization.entity';
import { ComplianceDefinition } from '../../../compliance_definitions/entities/compliance_definition.entity';
import { OrganizationComplianceAiResponse } from '../organization_compliance_responses/organization_compliance_ai_responses/entities/organization_compliance_ai_response.entity';
import { OrganizationComplianceNote } from '../organization_compliance_notes/entities/organization_compliance_note.entity';
import { OrganizationComplianceQuestionBookmarks } from '../organization_compliance_bookmarks/entities/organization_compliance_bookmark.entity';

@Entity('organization_compliance')
export class OrganizationCompliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  compliance_definition_name: string;

  @Column('json', { nullable: true })
  metadata: object;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  organization_id: string;

  @ManyToOne(() => Organization, organization => organization.organization_compliance)
  organization: Organization;

  @ManyToOne(() => ComplianceDefinition, compliance_definition => compliance_definition.organization_compliances)
  compliance_definition: ComplianceDefinition;

  @ManyToOne(() => OrganizationComplianceAiResponse, organization_compliance_ai_responses => organization_compliance_ai_responses.organization_compliance_responses)
  organization_compliance_ai_response: OrganizationComplianceAiResponse;

  @OneToMany(() => OrganizationComplianceNote, organizationComplianceNote => organizationComplianceNote.organization_compliance)
  organization_compliance_notes: OrganizationComplianceNote[];

  @OneToMany(() => OrganizationComplianceQuestionBookmarks, bookmarks => bookmarks.compliance_question)
  question_bookmarks: OrganizationComplianceQuestionBookmarks[];
}
