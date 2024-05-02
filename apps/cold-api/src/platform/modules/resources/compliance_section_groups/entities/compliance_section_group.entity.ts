import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComplianceSection } from '../../compliance_sections/entities/compliance_section.entity';
import { ComplianceDefinition } from '../../compliance_definitions/entities/compliance_definition.entity';

@Entity('compliance_section_groups')
export class ComplianceSectionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  compliance_definition_name: string;

  @Column({ type: 'json', nullable: true })
  metadata: object;

  @OneToMany(() => ComplianceSection, complianceSections => complianceSections.section_group)
  compliance_sections: ComplianceSection[];
  @OneToMany(() => ComplianceDefinition, complianceDefinitions => complianceDefinitions.compliance_section_groups)
  compliance_definition: ComplianceDefinition;
}
