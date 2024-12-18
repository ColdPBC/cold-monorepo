import { Entity, Field, ID, RelationshipField } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { MaterialClassification } from './material-classification';
import { Organization } from './organization';
import { SustainabilityAttribute } from './sustainability-attribute';
import { SustainabilityAttributeClassifcationAssignment as OrmSustainabilityAttributeClassifcationAssignment } from '../entities';
import { connection } from '../database';

@Entity<SustainabilityAttributeClassifcationAssignment>('SustainabilityAttributeClassifcationAssignment', {
	provider: new MikroBackendProvider(OrmSustainabilityAttributeClassifcationAssignment, connection),
})
export class SustainabilityAttributeClassifcationAssignment {
	@Field(() => ID, { primaryKeyField: true })
	id!: number;

	@RelationshipField<SustainabilityAttributeClassifcationAssignment>(() => Organization, { id: (entity) => entity.organization?.id })
	organization!: Organization;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => GraphQLJSON)
	metadata!: Record<string, unknown>;

	@RelationshipField<SustainabilityAttributeClassifcationAssignment>(() => SustainabilityAttribute, { id: (entity) => entity.sustainabilityAttribute?.id })
	sustainabilityAttribute!: SustainabilityAttribute;

	@RelationshipField<SustainabilityAttributeClassifcationAssignment>(() => MaterialClassification, { id: (entity) => entity.materialClassification?.id })
	materialClassification!: MaterialClassification;
}
