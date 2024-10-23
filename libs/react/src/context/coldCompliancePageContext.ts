import { AllCompliance } from '@coldpbc/interfaces';
import { createContext } from 'react';
import { CompliancePageFilter } from '@coldpbc/enums';

export interface CompliancePageData {
	allComplianceSets: AllCompliance[] | undefined;
}

export interface CompliancePageContextType {
	data: CompliancePageData;
	filter: CompliancePageFilter;
	setFilter: (filter: CompliancePageFilter) => void;
}

export const ColdCompliancePageContext = createContext<CompliancePageContextType>({
	data: {
		allComplianceSets: [],
	},
	filter: CompliancePageFilter.all,
	setFilter: () => {},
});
