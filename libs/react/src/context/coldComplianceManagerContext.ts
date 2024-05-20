import { MQTTComplianceManagerPayload, OrgCompliance } from '@coldpbc/interfaces';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import React, { createContext } from 'react';
import { SWRResponse } from 'swr';

export interface ComplianceManagerData {
  orgCompliances: OrgCompliance[] | undefined;
  mqttComplianceSet: MQTTComplianceManagerPayload | undefined;
  files: SWRResponse<any[], any, any> | undefined;
  currentAIStatus: unknown | undefined;
  name: string;
}

export interface ComplianceManagerContextType {
  data: ComplianceManagerData;
  status: ComplianceManagerStatus;
  setStatus: (status: ComplianceManagerStatus) => void;
  complianceCounts: {
    [key: string]: {
      not_started: number;
      ai_answered: number;
      user_answered: number;
      bookmarked: number;
    };
  };
  setComplianceCounts: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        not_started: number;
        ai_answered: number;
        user_answered: number;
        bookmarked: number;
      };
    }>
  >;
  showOverviewModal: boolean;
  setShowOverviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColdComplianceManagerContext = createContext<ComplianceManagerContextType>({
  data: {
    mqttComplianceSet: undefined,
    orgCompliances: undefined,
    files: undefined,
    name: '',
    currentAIStatus: undefined,
  },
  status: ComplianceManagerStatus.notActivated,
  setStatus: () => {},
  complianceCounts: {},
  setComplianceCounts: () => {},
  showOverviewModal: false,
  setShowOverviewModal: () => {},
});
