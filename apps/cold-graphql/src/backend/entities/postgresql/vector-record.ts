import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationFile } from './organization-file';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only } from '../../acl_policies';

@Entity({ tableName: 'vector_records' })
@ApplyAccessControlList(cold_admin_only)
export class VectorRecord {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Property({ type: 'json' })
  metadata!: Record<string, unknown>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'vector_records_organization_file_id_idx' })
  organizationFile?: Ref<OrganizationFile>;

  @ManyToOne({ entity: () => Organization, ref: true, index: 'vector_records_organization_id_idx' })
  organization!: Ref<Organization>;

  @Property({ type: 'text', nullable: true })
  url?: string;

  @Property({ type: 'json' })
  values!: Record<string, unknown>;

  @Property({ type: 'text' })
  indexName!: string;

  @Property({ type: 'text' })
  namespace!: string;
}
