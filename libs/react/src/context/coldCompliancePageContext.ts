import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { createContext } from 'react';
import { CompliancePageFilter } from '@coldpbc/enums';

export interface CompliancePageData {
  complianceSets: Compliance[];
  orgComplianceSets: OrgCompliance[];
}

export interface CompliancePageContextType {
  data: CompliancePageData;
  filter: CompliancePageFilter;
  setFilter: (filter: CompliancePageFilter) => void;
}

export const ColdCompliancePageContext = createContext<CompliancePageContextType>({
  data: {
    complianceSets: [],
    orgComplianceSets: [],
  },
  filter: CompliancePageFilter.all,
  setFilter: () => {},
});
