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
}

export const SurveyRightNav = ({
  activeKey,
  setActiveKey,
  surveyData,
  setSurveyData,
  submitSurvey,
  startSurvey,
}: SurveyRightNavProps) => {
  return (
    <>
      {isEmpty(activeKey.value) ? (
        <div
          className={
            'w-[708px] h-[1040px] flex items-center justify-center px-[64px]'
          }
        >
          <SurveyIntro
            surveyFormData={surveyData.definition}
            onSurveyStart={startSurvey}
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
