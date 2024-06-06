import { createContext } from 'react';

export interface ComplianceQuestionnaireContextType {
  activeQuestion: string | null;
  setActiveQuestion: (question: string | null) => void;
}

export const ColdComplianceQuestionnaireContext = createContext<ComplianceQuestionnaireContextType>({
  activeQuestion: null,
  setActiveQuestion: () => {},
});
