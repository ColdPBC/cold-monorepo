import { createContext } from 'react';

export interface ComplianceQuestionnaireContextType {
  activeQuestion: string | null;
  setActiveQuestion: (question: string | null) => void;
  name: string;
}

export const ColdComplianceQuestionnaireContext = createContext<ComplianceQuestionnaireContextType>({
  activeQuestion: null,
  setActiveQuestion: () => {},
  name: '',
});
