import { SustainabilityAttributeAssurance } from './attributeAssurance';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

export interface SustainabilityAttribute {
	id: string;
	name: string;
	logoUrl?: string;
	level: EntityLevel;
	attributeAssurances: SustainabilityAttributeAssurance[];
}

export interface SustainabilityAttributeWithStatus {
	id: string;
	name: string;
	logoUrl?: string;
	level: EntityLevel;
	assuranceStatus: AttributeAssuranceStatus;
	expirationDate?: Date | null;
}
