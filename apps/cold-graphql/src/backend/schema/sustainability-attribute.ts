import { Entity, Field, ID, RelationshipField, graphweaverMetadata } from '@exogee/graphweaver';
import { GraphQLJSON, ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { AttributeAssurance } from './attribute-assurance';
import { MaterialClassification } from './material-classification';
import { Organization } from './organization';
import { SustainabilityAttributeClassifcationAssignment } from './sustainability-attribute-classifcation-assignment';
import { SustainabilityAttributesLevel, SustainabilityAttributesType, SustainabilityAttribute as OrmSustainabilityAttribute } from '../entities';
import { connection } from '../database';

graphweaverMetadata.collectEnumInformation({ target: SustainabilityAttributesLevel, name: 'SustainabilityAttributesLevel' });
graphweaverMetadata.collectEnumInformation({ target: SustainabilityAttributesType, name: 'SustainabilityAttributesType' });

@Entity<SustainabilityAttribute>('SustainabilityAttribute', {
	provider: new MikroBackendProvider(OrmSustainabilityAttribute, connection),
})
export class SustainabilityAttribute {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@RelationshipField<SustainabilityAttribute>(() => Organization, { id: (entity) => entity.organization?.id, nullable: true })
	organization?: Organization;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	name!: string;

	@Field(() => ISODateStringScalar, { nullable: true })
	createdAt?: Date;

	@Field(() => ISODateStringScalar, { nullable: true })
	updatedAt?: Date;

	@Field(() => Boolean)
	deleted = false;

	@Field(() => SustainabilityAttributesLevel)
	level!: string;

	@Field(() => SustainabilityAttributesType)
	type!: string;

	@Field(() => GraphQLJSON, { nullable: true })
	metadata?: Record<string, unknown>;

	@Field(() => String, { nullable: true })
	logoUrl?: string;

	@RelationshipField<SustainabilityAttribute>(() => MaterialClassification, { id: (entity) => entity.materialClassification?.id, nullable: true })
	materialClassification?: MaterialClassification;

	@RelationshipField<AttributeAssurance>(() => [AttributeAssurance], { relatedField: 'sustainabilityAttribute' })
	attributeAssurances!: AttributeAssurance[];

	@RelationshipField<SustainabilityAttributeClassifcationAssignment>(() => [SustainabilityAttributeClassifcationAssignment], { relatedField: 'sustainabilityAttribute' })
	sustainabilityAttributeClassifcationAssignments!: SustainabilityAttributeClassifcationAssignment[];
}
