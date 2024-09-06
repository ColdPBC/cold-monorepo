import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Integration } from './integration';
import { OrganizationFacility } from './organization-facility';

@Entity({ tableName: 'emissions' })
export class Emission {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => Integration, ref: true })
	integration!: Ref<Integration>;

	@Property({ type: 'json' })
	activityData!: Record<string, unknown>;

	@Property({ type: 'json' })
	integrationData!: Record<string, unknown>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	region!: string;

	@Property({ type: 'text' })
	category!: string;

	@Property({ type: 'double' })
	co2e!: number;

	@Property({ type: 'text' })
	co2eCalculationOrigin!: string;

	@Property({ type: 'text' })
	co2eUnit!: string;

	@Property({ type: 'json' })
	emissionFactor!: Record<string, unknown>;

	@Property({ fieldName: 'co2_calculation_method', type: 'text' })
	co2CalculationMethod!: string;

	@Property({ type: 'json' })
	constituentGases!: Record<string, unknown>;

	@ManyToOne({ entity: () => OrganizationFacility, ref: true, fieldName: 'facility_id' })
	organizationFacility!: Ref<OrganizationFacility>;

	@Property({ type: 'boolean', default: false })
	deleted = false;
}
