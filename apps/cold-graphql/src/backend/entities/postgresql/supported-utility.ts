import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Entity, ManyToOne, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { ServiceDefinition } from './service-definition';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'supported_utilities' })
export class SupportedUtility {
	@Unique({ name: 'supported_utilities_id_key' })
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => ServiceDefinition, ref: true })
	serviceDefinition!: Ref<ServiceDefinition>;

	@Unique({ name: 'supported_utilities_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	label!: string;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
}
