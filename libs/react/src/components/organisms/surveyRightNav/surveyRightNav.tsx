import React from 'react';
import { SurveyActiveKeyType, SurveyDataType } from '@coldpbc/interfaces';
import { isEmpty } from 'lodash';
import { SurveyQuestionContainer } from '../surveyQuestionContainer';
import { SurveyIntro } from '../../molecules';

export interface SurveyRightNavProps {
  activeKey: SurveyActiveKeyType;
  setActiveKey: (key: SurveyActiveKeyType) => void;
  surveyData: SurveyDataType;
  setSurveyData: (data: SurveyDataType) => void;
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
            surveyFormDefinition={surveyData.definition}
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
