import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { cold_admin_only } from '../../acl_policies';

@Entity({ tableName: '_prisma_migrations' })
@ApplyAccessControlList(cold_admin_only)
export class PrismaMigration {
  @PrimaryKey({ type: 'string', length: 36 })
  id!: string;

  @Property({ type: 'string', length: 64 })
  checksum!: string;

  @Property({ type: 'datetime', length: 6, nullable: true })
  finishedAt?: Date;

  @Property({ type: 'string', length: 255 })
  migrationName!: string;

  @Property({ type: 'text', nullable: true })
  logs?: string;

  @Property({ type: 'datetime', length: 6, nullable: true })
  rolledBackAt?: Date;

  @Property({ type: 'datetime', length: 6 })
  startedAt!: Date;

  @Property({ type: 'integer', default: 0 })
  appliedStepsCount = 0;
}
