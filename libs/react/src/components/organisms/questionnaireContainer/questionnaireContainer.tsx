import { useContext, useEffect, useState } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { QuestionnaireQuestionItem, Spinner } from '@coldpbc/components';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper } from '@coldpbc/hooks';

export const QuestionnaireContainer = (props: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
  const { sidebarOpen, setSidebarOpen } = props;
  const { orgId } = useAuth0Wrapper();
  const { activeQuestion, setActiveQuestion, name } = useContext(ColdComplianceQuestionnaireContext);
  const [focusQuestion, setFocusQuestion] = useState<string | null>(null);

  const getQuestionsUrl = () => {
    if (!orgId) return null;
    return [`/compliance_definitions/${name}/organizations/${orgId}/questions`, 'GET'];
  };

  const questionsSWR = useSWR<
    {
      name: string;
      key: string;
      sections: {
        name: string;
        key: string;
        questions: QuestionnaireQuestion[];
      }[];
    }[],
    any,
    any
  >(getQuestionsUrl(), axiosFetcher);

  useEffect(() => {
    // handle scrolling to question
  }, [activeQuestion]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [focusQuestion]);

  if (questionsSWR.isLoading) {
    return <Spinner />;
  }

  if (!questionsSWR.data) {
    return null;
  }

  const sectionGroups = questionsSWR.data;

  // todo: add paging capability
  return (
    <div className={'w-full flex flex-col gap-[40px] overflow-x-auto'}>
      {sectionGroups.map((sectionGroup, index) => {
        return (
          <div className={'w-full flex flex-col gap-[40px] items-start'}>
            <div className={'text-h1 text-tc-primary'}>{sectionGroup.name}</div>
            {sectionGroup.sections.map((section, index) => {
              return (
                <div className={'flex flex-col gap-[40px]'}>
                  <div className={'text-h2 text-tc-primary'}>{section.name}</div>
                  {section.questions.map((question, index) => {
                    return <QuestionnaireQuestionItem number={index + 1} question={question} focusQuestion={focusQuestion} setFocusQuestion={setFocusQuestion} />;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
