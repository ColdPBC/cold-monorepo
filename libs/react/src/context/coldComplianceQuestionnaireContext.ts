import { createContext } from 'react';
import { ComplianceSidebarPayload, QuestionnaireQuestion } from '@coldpbc/interfaces';

export interface ComplianceQuestionnaireContextType {
  name: string;
  scrollToQuestion: string | null;
  setScrollToQuestion: (question: string | null) => void;
  focusQuestion: {
    key: string;
    aiDetails: {
      ai_response?: QuestionnaireQuestion['ai_response'];
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
        ai_response?: QuestionnaireQuestion['ai_response'];
        ai_answered?: boolean;
        ai_attempted?: boolean;
        value?: any;
        questionAnswerSaved: boolean;
        questionAnswerChanged: boolean;
      };
    } | null,
  ) => void;
  sectionGroups: ComplianceSidebarPayload;
}

export const ColdComplianceQuestionnaireContext = createContext<ComplianceQuestionnaireContextType>({
  name: '',
  scrollToQuestion: null,
  setScrollToQuestion: () => {},
  focusQuestion: null,
  setFocusQuestion: () => {},
  sectionGroups: {
    name: '',
    compliance_section_groups: [],
  },
});
