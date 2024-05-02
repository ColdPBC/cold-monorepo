import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationCompliance } from '../organization_compliance/entities/organization_compliance.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('json')
  enabled_connections: object;

  @Column()
  display_name: string;

  @Column('json', { nullable: true })
  branding: object;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column('boolean', { default: false })
  isTest: boolean;

  @OneToMany(() => OrganizationCompliance, organization_compliance => organization_compliance.organization)
  organization_compliance: OrganizationCompliance[];
}
