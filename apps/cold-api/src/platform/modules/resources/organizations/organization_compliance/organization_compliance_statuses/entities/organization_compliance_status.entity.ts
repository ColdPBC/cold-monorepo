import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationCompliance } from '../../entities/organization_compliance.entity';

@Entity('organization_compliance_statuses')
export class OrganizationComplianceStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  email: string;

  // @ts-expect-error statuses does not exist on organization_compliances
  @ManyToOne(() => OrganizationCompliance, organization_compliance => organization_compliance.statuses)
  organization_compliance: OrganizationCompliance;
}
