import React from 'react';
import { SurveyActiveKeyType, SurveyPayloadType } from '@coldpbc/interfaces';
import { isEmpty } from 'lodash';
import { SurveyIntro, SurveyQuestionContainer } from '../../molecules';

export interface SurveyRightNavProps {
  activeKey: SurveyActiveKeyType;
  setActiveKey: (key: SurveyActiveKeyType) => void;
  surveyData: SurveyPayloadType;
  setSurveyData: (data: SurveyPayloadType) => void;
  submitSurvey: () => void;
  startSurvey: () => void;
  submitted: boolean;
  closeSurvey: () => void;
}

export const SurveyRightNav = ({
  activeKey,
  setActiveKey,
  surveyData,
  setSurveyData,
  submitSurvey,
  startSurvey,
  submitted,
  closeSurvey,
}: SurveyRightNavProps) => {
  return (
    <>
      {isEmpty(activeKey.value) || submitted ? (
        <div
          className={
            'w-[708px] h-full flex flex-1 items-center justify-center px-[64px]'
          }
        >
          <SurveyIntro
            surveyFormData={surveyData.definition}
            startSurvey={startSurvey}
            submitted={submitted}
            closeSurvey={closeSurvey}
          />
        </div>
      ) : (
        <SurveyQuestionContainer
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          surveyData={surveyData}
          setSurveyData={setSurveyData}
          submitSurvey={submitSurvey}
        />
      )}
    </>
  );
};
