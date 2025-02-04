import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Organization } from './organization';
import { ProductsTag as OrmProductsTag } from '../entities';
import { connection } from '../database';

@Entity<ProductsTag>('ProductsTag', {
	provider: new MikroBackendProvider(OrmProductsTag, connection),
})
export class ProductsTag {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@RelationshipField<ProductsTag>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => String)
	tag!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;
}
