import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'facility_footprints' })
export class FacilityFootprint {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	facilityId!: string;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json' })
	emissions!: Record<string, unknown>;

	@Property({ type: 'text', default: 'year' })
	type!: string;

	@Property({ type: 'integer' })
	value!: number;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
