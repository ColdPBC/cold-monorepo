import { useContext, useEffect, useState } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { QuestionnaireQuestionItem, Spinner } from '@coldpbc/components';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { Element, scroller } from 'react-scroll';
import { useSearchParams } from 'react-router-dom';

export const QuestionnaireContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orgId } = useAuth0Wrapper();
  const { name, activeQuestion, focusQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const [focusQuestionKey, setFocusQuestionKey] = useState<string | null>(null);
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
    if (activeQuestion === null) return;
    scroller.scrollTo(activeQuestion, {
      duration: 200,
      containerId: 'questionnaireContainer',
    });
  }, [activeQuestion]);

  // get query params from url
  useEffect(() => {
    const sectionKey = searchParams.get('section');
    if (sectionKey) {
      scroller.scrollTo(sectionKey, {
        duration: 200,
        containerId: 'questionnaireContainer',
      });
    }
  }, []);

  if (questionsSWR.isLoading) {
    return <Spinner />;
  }

  if (!questionsSWR.data) {
    return null;
  }

  const sectionGroups = questionsSWR.data;

  // todo: add paging capability. provide section id to API
  // todo: handle updating question answers and bookmarking
  return (
    <div className={'w-full pt-[24px] px-[40px] flex flex-col gap-[40px] overflow-x-auto scrollbar-hide'} id={'questionnaireContainer'}>
      {sectionGroups.map((sectionGroup, index) => {
        return (
          <div className={'w-full flex flex-col gap-[40px] items-start'}>
            <div className={`text-h1 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}>{sectionGroup.name}</div>
            {sectionGroup.sections.map((section, index) => {
              return (
                <Element name={section.key}>
                  <div className={'flex flex-col gap-[40px]'}>
                    <div className={`text-h2 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}>{section.name}</div>
                    {section.questions.map((question, index) => {
                      return (
                        <Element name={question.key}>
                          <QuestionnaireQuestionItem number={index + 1} question={question} focusQuestion={focusQuestionKey} setFocusQuestion={setFocusQuestionKey} />
                        </Element>
                      );
                    })}
                  </div>
                </Element>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
