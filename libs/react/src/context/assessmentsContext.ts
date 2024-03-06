import { createContext } from 'react';

export interface AssessmentsContextType {
  currentAssessment: string;
  data: {
    [key: string]: any;
  };
}

export const AssessmentsContext = createContext<AssessmentsContextType>({
  currentAssessment: '',
  data: {}
});

