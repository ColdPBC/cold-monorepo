import { createContext } from 'react';
import { EmissionPayload, InputOption } from '@coldpbc/interfaces';

export interface ColdEmissionsContextData {
	emissions: EmissionPayload | undefined;
	uniqueScopes: Array<number>;
	facilityOptions: Array<InputOption>;
	yearOptions: Array<InputOption>;
}

export type ColdEmissionsContextType = {
	data: ColdEmissionsContextData;
	selectedYear: InputOption;
	setSelectedYear: (option: InputOption) => void;
	selectedFacility: InputOption;
	setSelectedFacility: (option: InputOption) => void;
	isSingleYear: boolean;
};

export const ColdEmissionsContext = createContext({
	data: {},
	selectedYear: {
		id: 0,
		name: 'All Years',
		value: 'all',
	},
	setSelectedYear: (year: InputOption) => {},
	selectedFacility: {
		id: 0,
		name: 'All Facilities',
		value: 'all',
	},
	setSelectedFacility: (facility: InputOption) => {},
	isSingleYear: false,
} as ColdEmissionsContextType);
