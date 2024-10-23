import { EntityLevel } from '@coldpbc/enums';

export interface SustainabilityAttributeAssurance {
	id: string;
	effectiveEndDate: string | null;
	material?: {
		id: string;
	} | null;
	organization?: {
		id: string;
	} | null;
	organizationFile: {
		id: string;
	} | null;
	organizationFacility?: {
		id: string;
	} | null;
	product?: {
		id: string;
	} | null;
	sustainabilityAttribute?: {
		id: string;
		name: string;
		level: EntityLevel;
		logoUrl?: string;
	} | null;
}
