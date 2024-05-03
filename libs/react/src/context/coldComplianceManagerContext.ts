import { ComplianceManager, OrgComplianceManager } from '@coldpbc/interfaces';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { createContext } from 'react';

export interface ComplianceManagerData {
  complianceSet: ComplianceManager | undefined;
  orgComplianceSet: OrgComplianceManager | undefined;
}

export interface ComplianceManagerContextType {
  data: ComplianceManagerData;
  status: ComplianceManagerStatus;
  setStatus: (status: ComplianceManagerStatus) => void;
}

export const ColdComplianceManagerContext = createContext<ComplianceManagerContextType>({
  data: {
    complianceSet: undefined,
    orgComplianceSet: undefined,
  },
  status: ComplianceManagerStatus.notActivated,
  setStatus: () => {},
});
