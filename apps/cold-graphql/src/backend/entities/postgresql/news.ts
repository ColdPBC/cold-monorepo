import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'news' })
export class News {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'text' })
	url!: string;

	@Property({ type: 'text' })
	imageUrl!: string;

	@Property({ type: 'datetime', length: 3 })
	publishedAt!: Date;

	@Property({ type: 'text' })
	sourceName!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	publish = false;
}
