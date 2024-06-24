import { ComplianceManagerCountsPayload, CurrentAIStatusPayload, MQTTComplianceManagerPayload, OrgCompliance } from '@coldpbc/interfaces';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import React, { createContext } from 'react';
import { SWRResponse } from 'swr';

export interface ComplianceManagerData {
  orgCompliances: OrgCompliance[] | undefined;
  mqttComplianceSet: MQTTComplianceManagerPayload | undefined;
  complianceCounts: SWRResponse<ComplianceManagerCountsPayload, any, any> | undefined;
  files: SWRResponse<any[], any, any> | undefined;
  currentAIStatus: CurrentAIStatusPayload | undefined;
  name: string;
}

export interface ComplianceManagerContextType {
  data: ComplianceManagerData;
  status: ComplianceManagerStatus;
  setStatus: (status: ComplianceManagerStatus) => void;
  showOverviewModal: boolean;
  setShowOverviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColdComplianceManagerContext = createContext<ComplianceManagerContextType>({
  data: {
    mqttComplianceSet: undefined,
    orgCompliances: undefined,
    complianceCounts: undefined,
    files: undefined,
    name: '',
    currentAIStatus: undefined,
  },
  status: ComplianceManagerStatus.notActivated,
  setStatus: () => {},
  showOverviewModal: false,
  setShowOverviewModal: () => {},
});
