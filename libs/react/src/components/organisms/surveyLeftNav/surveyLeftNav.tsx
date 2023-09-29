import React from 'react';
import { SurveyActiveKeyType, SurveyPayloadType } from '@coldpbc/interfaces';
import { isEmpty } from 'lodash';
import { HexColors } from '@coldpbc/themes';
import { ColdWordmark, SurveySectionsProgress } from '@coldpbc/components';

export interface SurveyLeftNavProps {
  surveyData: SurveyPayloadType;
  activeKey: SurveyActiveKeyType;
  setActiveKey: (key: SurveyActiveKeyType) => void;
  submitted: boolean;
}

export const SurveyLeftNav = (props: SurveyLeftNavProps) => {
  const { surveyData, activeKey, submitted } = props;
  const { definition: surveyFormData } = surveyData;
  return (
    <>
      {isEmpty(activeKey.value) || submitted ? (
        <div className={'pb-[37px] relative'}>
          <div
            className={'w-[668px] h-[920px] rounded-2xl'}
            style={{
              background: `url('${surveyFormData.image_url}'), lightgray 50% / cover no-repeat`,
            }}
          ></div>
        </div>
      ) : (
        <div className={''}>
          <div className={'pr-[12px]'}>
            <SurveySectionsProgress
              sections={surveyFormData.sections}
              activeKey={activeKey}
            />
          </div>
          <div className={'pt-[6px] pb-[16px] pr-[491px]'}>
            <div className={'text-tc-primary text-sm font-medium'}>
              Your progress is auto-saved
            </div>
          </div>
        </div>
      )}
    </>
  );
};
