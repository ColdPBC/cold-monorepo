import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Integration } from './integration';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'utility_bills' })
export class UtilityBill {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Integration, ref: true })
	integration!: Ref<Integration>;

	@Property({ type: 'datetime', length: 3 })
	periodFrom!: Date;

	@Property({ type: 'datetime', length: 3 })
	periodTo!: Date;

	@Property({ type: 'json' })
	data!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'facility_id' })
	organizationFacility!: Ref<OrganizationFacility>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
