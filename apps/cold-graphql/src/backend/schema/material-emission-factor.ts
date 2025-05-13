import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { EcoinventActivity } from './ecoinvent-activity';
import { EmissionFactor } from './emission-factor';
import { Material } from './material';
import { MaterialEmissionFactor as OrmMaterialEmissionFactor } from '../entities';
import { connection } from '../database';

@Entity<MaterialEmissionFactor>('MaterialEmissionFactor', {
	provider: new MikroBackendProvider(OrmMaterialEmissionFactor, connection),
})
export class MaterialEmissionFactor {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<MaterialEmissionFactor>(() => Material, { id: (entity) => entity.material?.id })
	material!: Material;

	@RelationshipField<MaterialEmissionFactor>(() => EmissionFactor, { id: (entity) => entity.emissionFactor?.id })
	emissionFactor!: EmissionFactor;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<MaterialEmissionFactor>(() => EcoinventActivity, { id: (entity) => entity.ecoinventActivity?.id, nullable: true })
	ecoinventActivity?: EcoinventActivity;

	@Field(() => String, { nullable: true })
	organizationId?: string;

	@Field(() => String, { nullable: true })
	reasoning?: string;
}
