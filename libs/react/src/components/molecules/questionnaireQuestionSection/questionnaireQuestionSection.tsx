import { ErrorFallback, QuestionnaireQuestionItem, QuestionnaireQuestionItemPlaceholder } from '@coldpbc/components';
import React, { useContext, useEffect } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { ComplianceSidebarSection, QuestionnaireQuestion } from '@coldpbc/interfaces';
import { useSearchParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { orderBy } from 'lodash';
import { useColdContext } from '@coldpbc/hooks';

const _QuestionnaireQuestionSection = (props: {
  innerRef: ((node?: globalThis.Element | null | undefined) => void) | null;
  section: ComplianceSidebarSection;
  sectionGroupId: string;
  pagedSectionData: QuestionnaireQuestion[] | undefined;
  questionnaireMutate: () => void;
}) => {
  const { logBrowser } = useColdContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { focusQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const { innerRef, section, pagedSectionData, sectionGroupId, questionnaireMutate } = props;
  const sectionKey = searchParams.get('section');
  const isSectionInQuery = sectionKey === section.key;

  useEffect(() => {
    // remove search params after a
    if (isSectionInQuery) {
      setTimeout(() => {
        // delete section key from query params
        setSearchParams((prevParams: any) => {
          const params = new URLSearchParams(prevParams);
          params.delete('section');
          return params;
        });
      }, 3000);
    }
  }, [searchParams]);

  const orderedQuestions = orderBy(pagedSectionData, ['order'], ['asc']);

  logBrowser(`QuestionnaireQuestionSection loaded for section: ${section.title}`, 'info', {
    sectionKey,
    isSectionInQuery,
    orderedQuestions,
  });

  return (
    <div className={'flex flex-col gap-[40px] w-full'} ref={innerRef}>
      <div
        className={`text-h2 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}
        ref={el => {
          if (isSectionInQuery && el && focusQuestion === null) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }}>
        {section.title}
      </div>
      {orderedQuestions.map((question, index) => {
        const pagedQuestionData = pagedSectionData?.find(q => q.key === question.key);
        if (pagedQuestionData) {
          return (
            <QuestionnaireQuestionItem
              key={question.key}
              number={index + 1}
              question={pagedQuestionData}
              sectionId={section.id}
              sectionGroupId={sectionGroupId}
              questionnaireMutate={questionnaireMutate}
            />
          );
        } else {
          return <QuestionnaireQuestionItemPlaceholder key={question.key} number={index + 1} question={question} />;
        }
      })}
    </div>
  );
};

export const QuestionnaireQuestionSection = withErrorBoundary(_QuestionnaireQuestionSection, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in QuestionnaireQuestionSection: ', error);
  },
});
