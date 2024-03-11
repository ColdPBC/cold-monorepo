import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, SurveySectionFollowUpsType, SurveySectionFollowUpType } from '@coldpbc/interfaces';
import { find, keys, map } from 'lodash';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

export interface ComplianceSurveyRightNavProps {
  activeKey: ComplianceSurveyActiveKeyType;
  setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
  surveyData: ComplianceSurveyPayloadType;
  surveyOpen: boolean;
  setSurveyOpen: (surveyOpen: boolean) => void;
}

const _ComplianceSurveyRightNav = (props: ComplianceSurveyRightNavProps) => {
  const { activeKey, setActiveKey, surveyData, setSurveyOpen, surveyOpen } = props;

  const onClick = (key: string) => {
    // open modal with
    setActiveKey({
      ...activeKey,
      value: key,
    });
    setSurveyOpen(true);
  };

  const getQuestionItem = (question: SurveySectionFollowUpType, key: string, questions: SurveySectionFollowUpsType) => {
    // check the progress of the survey. if the question has been answered, show a checkmark. if not, show a circle.
    const activeSection = surveyData.definition.sections[activeKey.section];
    const progressSection = find(surveyData.progress.sections, section => section.title === activeSection.title);
    const progressQuestion = progressSection?.questions[key];
    // get the index of the question in the questions object
    const index = keys(questions).indexOf(key) + 1;

    if (progressQuestion?.user_answered) {
      return (
        <div key={key} className={'h-[34px] flex flex-row space-x-2 items-center hover:underline cursor-pointer'} onClick={() => onClick(key)}>
          <div className={'w-[24px] h-[24px]'}>
            <ColdIcon name={IconNames.ColdComplianceSurveyCheckBoxIcon} className={' '} />
          </div>
          <div className={'w-full text-body line-clamp-1'}>
            {index}. {question.prompt}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className={'h-[34px] flex flex-row space-x-2 items-center hover:underline cursor-pointer'} onClick={() => onClick(key)}>
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <div className={'rounded-full h-[24px] w-[24px] bg-gray-70'}></div>
          </div>
          <div className={'w-full text-body line-clamp-1'}>
            {index}. {question.prompt}
          </div>
        </div>
      );
    }
  };

  const sectionQuestions = surveyData.definition.sections[activeKey.section].follow_up;

  return (
    <div className={'w-full h-full bg-bgc-accent pr-[99px] pl-[72px] pt-[38px] pb-[38px] text-tc-primary space-y-[18px] flex flex-col overflow-y-auto rounded-r-lg'}>
      <div className={'flex flex-col'}>
        <div className={'text-caption font-bold'}>{activeKey.category}</div>
        <div className={'text-h2'}>{surveyData.definition.sections[activeKey.section].title}</div>
      </div>
      {map(sectionQuestions, (question, key, questions) => {
        return getQuestionItem(question, key, questions);
      })}
    </div>
  );
};

export const ComplianceSurveyRightNav = withErrorBoundary(_ComplianceSurveyRightNav, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceSurveyRightNav: ', error);
  },
});
