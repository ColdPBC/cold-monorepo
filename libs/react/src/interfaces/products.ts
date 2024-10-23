import { EntityLevel } from '@coldpbc/enums';
import { SustainabilityAttributeAssurance } from './attributeAssurance';

export interface Products {
	id: string;
	name: string;
}

export interface ProductsQuery {
	id: string;
	name: string;
	description: string | null;
	productCategory: string | null;
	productSubcategory: string | null;
	productMaterials: {
		id: string;
		material: {
			id: string;
			name: string;
			attributeAssurances: SustainabilityAttributeAssurance[];
			materialSuppliers: {
				id: string;
				organizationFacility: {
					id: string;
					name: string;
					attributeAssurances: SustainabilityAttributeAssurance[];
				};
			}[];
		} | null;
	}[];
	organizationFacility: {
		id: string;
		name: string;
		attributeAssurances: SustainabilityAttributeAssurance[];
	} | null;
	attributeAssurances: SustainabilityAttributeAssurance[];
	metadata: any | null;
	seasonCode: string | null;
	upcCode: string | null;
	brandProductId: string | null;
	supplierProductId: string | null;
}
