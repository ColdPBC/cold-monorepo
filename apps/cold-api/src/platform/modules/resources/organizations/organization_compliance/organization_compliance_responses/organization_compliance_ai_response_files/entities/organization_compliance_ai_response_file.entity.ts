import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationFile } from '../../../../files/entities/organization_file.entity';
import { OrganizationComplianceAiResponse } from '../../organization_compliance_ai_responses/entities/organization_compliance_ai_response.entity';

@Entity('organization_compliance_ai_response_files')
export class OrganizationComplianceAiResponseFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => OrganizationFile, organization_files => organization_files.organization_compliance_ai_response_files)
  file: OrganizationFile;

  @ManyToOne(() => OrganizationComplianceAiResponse, organization_compliance_ai_response => organization_compliance_ai_response.organization_compliance_responses)
  organization_compliance_ai_response: OrganizationComplianceAiResponse;

  @ManyToOne(() => OrganizationFile, organizationFile => organizationFile.organization_compliance_ai_response_files)
  organization_files: OrganizationFile;
}
