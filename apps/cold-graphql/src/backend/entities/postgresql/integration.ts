import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Emission } from './emission';
import { Organization } from './organization';
import { OrganizationFacility } from './organization-facility';
import { OrganizationFile } from './organization-file';
import { ServiceDefinition } from './service-definition';
import { UtilityBill } from './utility-bill';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'integrations' })
export class Integration {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => ServiceDefinition, ref: true })
	serviceDefinition!: Ref<ServiceDefinition>;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'integrations_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'json' })
	metadata!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'facility_id', nullable: true })
	organizationFacility?: Ref<OrganizationFacility>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@OneToMany({ entity: () => Emission, mappedBy: 'integration' })
	emissions = new Collection<Emission>(this);

	@OneToMany({ entity: () => OrganizationFile, mappedBy: 'integration' })
	organizationFiles = new Collection<OrganizationFile>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'integration' })
	utilityBills = new Collection<UtilityBill>(this);
}
