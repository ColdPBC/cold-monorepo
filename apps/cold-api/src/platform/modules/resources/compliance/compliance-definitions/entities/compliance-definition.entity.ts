import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceSectionGroup } from '../../compliance-section-groups/entities/compliance-section-group.entity';
import { OrganizationCompliance } from '../../../organizations/organization_compliance/entities/organization_compliance.entity';

@Entity('compliance_definitions')
export class ComplianceDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int', { nullable: true })
  order: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column('json')
  surveys: object;

  @Column('json', { nullable: true })
  metadata: object;

  @Column('boolean', { default: false })
  visible: boolean;

  @OneToMany(() => ComplianceSectionGroup, complianceSectionGroups => complianceSectionGroups.compliance_definition)
  compliance_section_groups: ComplianceSectionGroup[];

  @OneToMany(() => OrganizationCompliance, organizationCompliances => organizationCompliances.compliance_definition)
  organization_compliances: OrganizationCompliance[];
}
