import { Element } from 'react-scroll';
import { QuestionnaireQuestionItem, QuestionnaireQuestionItemPlaceholder } from '@coldpbc/components';
import { useContext, useEffect } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { ComplianceSidebarSection, QuestionnaireQuestion } from '@coldpbc/interfaces';
import { useSearchParams } from 'react-router-dom';

export const QuestionnaireQuestionSection = (props: {
  innerRef: ((node?: globalThis.Element | null | undefined) => void) | null;
  section: ComplianceSidebarSection;
  sectionGroupId: string;
  pagedSectionData: QuestionnaireQuestion[] | undefined;
  questionnaireMutate: () => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { focusQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const { innerRef, section, pagedSectionData, sectionGroupId, questionnaireMutate } = props;
  const sectionKey = searchParams.get('section');
  const isSectionInQuery = sectionKey === section.key;

  useEffect(() => {
    // remove search params after a
    if (isSectionInQuery) {
      setTimeout(() => {
        setSearchParams({});
      }, 2000);
    }
  }, [searchParams]);

  return (
    <div className={'flex flex-col gap-[40px]'} ref={innerRef}>
      <div
        className={`text-h2 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}
        ref={el => {
          if (isSectionInQuery && el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }}>
        {section.title}
      </div>
      {section.compliance_questions
        .sort((a, b) => a.order - b.order)
        .map((question, index) => {
          const pagedQuestionData = pagedSectionData?.find(q => q.key === question.key);
          if (pagedQuestionData) {
            return (
              <Element name={question.key}>
                <QuestionnaireQuestionItem
                  number={index + 1}
                  question={pagedQuestionData}
                  sectionId={section.id}
                  sectionGroupId={sectionGroupId}
                  questionnaireMutate={questionnaireMutate}
                />
              </Element>
            );
          } else {
            return (
              <Element name={question.key}>
                <QuestionnaireQuestionItemPlaceholder number={index + 1} question={question} />
              </Element>
            );
          }
        })}
    </div>
  );
};
