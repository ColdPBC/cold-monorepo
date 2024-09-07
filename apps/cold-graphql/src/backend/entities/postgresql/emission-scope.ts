import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'emission_scopes' })
export class EmissionScope {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	label!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'integer', nullable: true })
	ghgSubcategory?: number;

	@Property({ type: 'integer' })
	ghgCategory!: number;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text', nullable: true })
	subcategoryLabel?: string;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
