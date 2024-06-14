import { createContext } from 'react';
import { ComplianceSidebarPayload, QuestionnaireQuestionComplianceResponse } from '@coldpbc/interfaces';
import { SWRResponse } from 'swr';

export interface ComplianceQuestionnaireContextType {
  name: string;
  scrollToQuestion: string | null;
  setScrollToQuestion: (question: string | null) => void;
  focusQuestion: {
    key: string;
    aiDetails: {
      ai_response: QuestionnaireQuestionComplianceResponse['ai_response'];
      ai_answered?: boolean;
      ai_attempted?: boolean;
      value?: any;
      questionAnswerSaved: boolean;
      questionAnswerChanged: boolean;
    };
  } | null;
  setFocusQuestion: (
    question: {
      key: string;
      aiDetails: {
        ai_response: QuestionnaireQuestionComplianceResponse['ai_response'];
        ai_answered?: boolean;
        ai_attempted?: boolean;
        value?: any;
        questionAnswerSaved: boolean;
        questionAnswerChanged: boolean;
      };
    } | null,
  ) => void;
  sectionGroups: SWRResponse<ComplianceSidebarPayload, any, any> | undefined;
}

export const ColdComplianceQuestionnaireContext = createContext<ComplianceQuestionnaireContextType>({
  name: '',
  scrollToQuestion: null,
  setScrollToQuestion: () => {},
  focusQuestion: null,
  setFocusQuestion: () => {},
  sectionGroups: undefined,
});
