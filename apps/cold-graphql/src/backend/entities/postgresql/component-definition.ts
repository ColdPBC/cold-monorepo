import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export enum ComponentDefinitionsType {
	UNKNOWN = 'UNKNOWN',
	FORM = 'FORM',
	NAVIGATION_SIDE = 'NAVIGATION_SIDE',
	NAVIGATION_HEADER = 'NAVIGATION_HEADER',
	NAVIGATION_FOOTER = 'NAVIGATION_FOOTER',
	DATAGRID = 'DATAGRID',
	TEST = 'TEST',
}

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'component_definitions' })
export class ComponentDefinition {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'component_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Enum({ type: 'string', items: () => ComponentDefinitionsType })
	type!: ComponentDefinitionsType;

	@Property({ type: 'text' })
	description!: string;

	@Property({ type: 'json' })
	definition!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;
}
