import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { Material } from './material';
import { SustainabilityAttribute } from './sustainability-attribute';
import { MaterialClassification as OrmMaterialClassification } from '../entities';
import { connection } from '../database';

@Entity<MaterialClassification>('MaterialClassification', {
	provider: new MikroBackendProvider(OrmMaterialClassification, connection),
})
export class MaterialClassification {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => String)
	category!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@RelationshipField<Material>(() => [Material], { relatedField: 'materialClassification' })
	materials!: Material[];

	@RelationshipField<SustainabilityAttribute>(() => [SustainabilityAttribute], { relatedField: 'materialClassification' })
	sustainabilityAttributes!: SustainabilityAttribute[];
}
