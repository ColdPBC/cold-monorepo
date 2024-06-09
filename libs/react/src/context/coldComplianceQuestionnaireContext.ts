import { createContext } from 'react';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';

export interface ComplianceQuestionnaireContextType {
  name: string;
  activeQuestion: string | null;
  setActiveQuestion: (question: string | null) => void;
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
}

export const ColdComplianceQuestionnaireContext = createContext<ComplianceQuestionnaireContextType>({
  activeQuestion: null,
  setActiveQuestion: () => {},
  name: '',
  focusQuestion: null,
  setFocusQuestion: () => {},
});
