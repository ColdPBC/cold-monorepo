import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationClaim } from './organization-claim';
import { ProductMaterial } from './product-material';

@Entity({ tableName: 'compliance-responses' })
export class Product {
    @Property({ type: 'text' })
    organization_compliance_id!: string;

    @Property({ type: 'text' })
    organization_id!: string;

    @Property({ type: 'text' })
    compliance_question_id!: string;

    @Property({ type: 'text' })
    compliance_section_id!: string;

    @Property({ type: 'text' })
    compliance_section_group_id!: string;

    @Property({ type: 'text' })
    compliance_definition_name!: string;

    @Property({ type: 'text' })
    organization_compliance_ai_response_id!: string;

    @Property({ type: 'text' })
    organization_compliance_response_id!: string;

    @ManyToOne({ entity: () => Organization, ref: true })
    organization!: Ref<Organization>;

    @OneToMany({ entity: () => OrganizationClaim, mappedBy: 'product' })
    organizationClaims = new Collection<OrganizationClaim>(this);

    @OneToMany({ entity: () => ProductMaterial, mappedBy: 'product' })
    productMaterials = new Collection<ProductMaterial>(this);
}
