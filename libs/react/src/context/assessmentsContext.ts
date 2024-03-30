import { createContext } from 'react';
import { ComplianceSurveyProgressType, OrgCompliance } from '@coldpbc/interfaces';

export interface AssessmentsContextData {
  [compliance_name: string]: {
    compliance?: OrgCompliance;
    section_types: { [section_type_name: string]: { score: number; max: number; percentage?: number } };
    progress_data: ComplianceSurveyProgressType;
    survey_type: string;
  };
}

export interface AssessmentsContextType {
  currentAssessment: string;
  setCurrentAssessment: (currentAssessment: string) => void;
  data: AssessmentsContextData;
}

export const AssessmentsContext = createContext<AssessmentsContextType>({
  currentAssessment: '',
  setCurrentAssessment: () => {},
  data: {},
});
