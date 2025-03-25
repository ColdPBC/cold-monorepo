export enum EntityLevel {
	MATERIAL = 'MATERIAL',
	ORGANIZATION = 'ORGANIZATION',
	PRODUCT = 'PRODUCT',
	SUPPLIER = 'SUPPLIER',
}

export interface EntityLevelAttributeAssuranceGraphQL {
	id: string;
	effectiveEndDate: string | null;
	organizationFile: {
		id: string;
	} | null;
	sustainabilityAttribute: {
		id: string;
		name: string;
		level: EntityLevel;
		logoUrl?: string;
	};
}

export interface ProductMaterialForWeightCalculation {
	id: string;
	yield: number | null;
	unit_of_measure: UnitOfMeasurement | null;
	weight: number | null;
	material: {
		id: string;
		material_classification: {
			id: string;
			weight_factor: number;
		} | null;
		weight_factor: number | null;
		weight_factor_unit_of_measure: WeightFactorUnits | null;
		width: number | null;
		width_unit_of_measure: Length | null;
	};
}

export interface ProductMaterial extends ProductMaterialForWeightCalculation {
	material: ProductMaterialForWeightCalculation['material'] & {
		id: string;
		name: string;
		material_category: string | null;
		material_subcategory: string | null;
		material_classification:
			| (ProductMaterialForWeightCalculation['material']['material_classification'] & {
					name: string;
					category: MaterialClassificationCategory;
			  })
			| null;
		emissions_factor: number | null;
		material_emission_factors: MaterialEmissionFactor[];
		attribute_assurances: EntityLevelAttributeAssuranceGraphQL[];
	};
}

export interface EmissionFactor {
	id: string;
	name: string;
	value: number;
	description: string | null;
}

export interface MaterialEmissionFactor {
	id: string;
	emission_factor: EmissionFactor;
}

export interface AggregatedEmissionFactor {
	value: number;
	emission_factors: EmissionFactor[];
}

export enum MaterialClassificationCategory {
	COATINGS_AND_LAMINATIONS = 'Coatings and Laminations',
	FOAM = 'Foam',
	INSULATION_MATERIAL = 'Insulation Material',
	LEATHER = 'Leather',
	LEATHER_ALTERNATIVES = 'Leather Alternatives',
	METALS = 'Metals',
	PLASTICS = 'Plastics',
	RUBBERS_ELASTOMERS = 'Rubbers/Elastomers',
	SYNTHETIC_LEATHER = 'Synthetic Leather',
	TEXTILES = 'Textiles',
	WOOD_BASED_MATERIALS = 'Wood-based Materials',
}

export const Length = {
	in: 'in',
	ft: 'ft',
	yd: 'yd',
	m: 'm',
} as const;

export const Area = {
	in2: 'in2',
	ft2: 'ft2',
	yd2: 'yd2',
	m2: 'm2',
} as const;

export const Weight = {
	kg: 'kg',
} as const;

export const Count = {
	pcs: 'pcs',
} as const;

export const UnitOfMeasurement = {
	...Length,
	...Area,
	...Weight,
	...Count,
} as const;

export type Length = (typeof Length)[keyof typeof Length];
export type Area = (typeof Area)[keyof typeof Area];
export type Weight = (typeof Weight)[keyof typeof Weight];
export type Count = (typeof Count)[keyof typeof Count];
export type UnitOfMeasurement = (typeof UnitOfMeasurement)[keyof typeof UnitOfMeasurement];

export enum WeightFactorUnits {
	KG_PER_M2 = 'kg per m2',
	KG_PER_PCS = 'kg per pcs',
}

export interface ProductMaterial extends ProductMaterialForWeightCalculation {
	// @ts-expect-error this is correct
	material: ProductMaterialForWeightCalculation['material'] & {
		id: string;
		name: string;
		material_category: string | null;
		material_subcategory: string | null;
		material_classification:
			| (ProductMaterialForWeightCalculation['material']['material_classification'] & {
					name: string;
					category: MaterialClassificationCategory;
			  })
			| null;
		emissions_factor: number | null;
		meterial_emission_factors: MaterialEmissionFactor[];
		attribute_assurances: EntityLevelAttributeAssuranceGraphQL[];
	};
}
