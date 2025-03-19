import React, {PropsWithChildren} from "react";
import {
  ColdComplianceQuestionnaireContext,
  ComplianceQuestionnaireContextType
} from "@coldpbc/context";
import {
  getComplianceMock,
  getQuestionnaireSidebarComplianceMock,
  StoryMockProvider,
  StoryMockProviderProps
} from "@coldpbc/mocks";
import {SWRResponse} from "swr";
import {AIDetails} from "@coldpbc/interfaces";

export interface QuestionnaireContextMockProviderProps extends StoryMockProviderProps {
  complianceQuestionnaireContext?: Partial<ComplianceQuestionnaireContextType>;
}

export const QuestionnaireContextMockProvider = (props: PropsWithChildren<QuestionnaireContextMockProviderProps>) => {
  const [focusQuestion, setFocusQuestion] = React.useState<{
    key: string;
    aiDetails: AIDetails;
  } | null>(props.complianceQuestionnaireContext?.focusQuestion ?? null);

  const [scrollToQuestion, setScrollToQuestion] = React.useState<string | null>(
    props.complianceQuestionnaireContext?.scrollToQuestion ?? null
  );

  const questionnaireContextData: ComplianceQuestionnaireContextType = {
    name: 'rei_pia_2024',
    sectionGroups: {
      data: getQuestionnaireSidebarComplianceMock(),
      error: undefined,
      revalidate: () => {},
      isValidating: false,
      isLoading: false,
      mutate: () => Promise.resolve(),
    } as SWRResponse<any, any, any>,
    complianceDefinition: getComplianceMock().find(c => c.name === 'rei_pia_2024'),
    focusQuestion: focusQuestion,
    setFocusQuestion: props.complianceQuestionnaireContext?.setFocusQuestion || setFocusQuestion,
    scrollToQuestion: scrollToQuestion,
    setScrollToQuestion: props.complianceQuestionnaireContext?.setScrollToQuestion || setScrollToQuestion,
    ...props.complianceQuestionnaireContext
  };

  return (
    <StoryMockProvider>
      <ColdComplianceQuestionnaireContext.Provider value={questionnaireContextData}>
        {props.children}
      </ColdComplianceQuestionnaireContext.Provider>
    </StoryMockProvider>
  );
}
