import { MQTTComplianceManagerPayload } from '@coldpbc/interfaces';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { createContext } from 'react';

export interface ComplianceManagerData {
  mqttComplianceSet: MQTTComplianceManagerPayload | undefined;
  name: string;
}

export interface ComplianceManagerContextType {
  data: ComplianceManagerData;
  status: ComplianceManagerStatus;
  setStatus: (status: ComplianceManagerStatus) => void;
}

export const ColdComplianceManagerContext = createContext<ComplianceManagerContextType>({
  data: {
    mqttComplianceSet: undefined,
    name: '',
  },
  status: ComplianceManagerStatus.notActivated,
  setStatus: () => {},
});
