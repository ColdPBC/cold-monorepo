import { MQTTComplianceManagerPayload } from '@coldpbc/interfaces';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import React, { createContext } from 'react';

export interface ComplianceManagerData {
  mqttComplianceSet: MQTTComplianceManagerPayload | undefined;
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
}

export const ColdComplianceManagerContext = createContext<ComplianceManagerContextType>({
  data: {
    mqttComplianceSet: undefined,
    name: '',
  },
  status: ComplianceManagerStatus.notActivated,
  setStatus: () => {},
  complianceCounts: {},
  setComplianceCounts: () => {},
});
