import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { createContext } from 'react';

export interface CompliancePageData {
  complianceSets: Compliance[];
  orgComplianceSets: OrgCompliance[];
}

export interface CompliancePageContextType {
  data: CompliancePageData;
}

export const CompliancePageContext = createContext<CompliancePageContextType>({
  data: {
    complianceSets: [],
    orgComplianceSets: [],
  },
});
