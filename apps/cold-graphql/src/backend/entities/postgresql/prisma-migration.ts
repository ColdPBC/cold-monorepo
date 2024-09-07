import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: '_prisma_migrations' })
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
