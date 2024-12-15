import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { connection } from '../../database';
import { OrganizationProductMaterialEmissions as ORMOrganizationProductMaterialEmissions } from '../../entities';

@Entity('OrganizationProductMaterialEmissions', {
	provider: new MikroBackendProvider(ORMOrganizationProductMaterialEmissions, connection),
	apiOptions: { excludeFromBuiltInWriteOperations: true },
})
export class OrganizationProductMaterialEmissions {
	@Field(() => String, { primaryKeyField: true, nullable: true })
	materialId?: string;

	@Field(() => String, { nullable: true })
	organizationId?: string;

	@Field(() => Number, { defaultValue: 0, nullable: true })
	emissionsFactor?: number;

	@Field(() => String, { nullable: true })
	productId?: string;

	@Field(() => String, { nullable: true })
	productCategory?: string;

	@Field(() => String, { nullable: true })
	productSubcategory?: string;

	@Field(() => String, { nullable: true })
	materialName?: string;
}
