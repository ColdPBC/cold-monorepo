import React from 'react';
import {
  SurveyActiveKeyType,
  SurveyFormDataPayloadType,
} from '@coldpbc/interfaces';
import { isEmpty } from 'lodash';
import { HexColors } from '@coldpbc/themes';
import { ColdWordmark, SurveySectionsProgress } from '@coldpbc/components';

export interface SurveyLeftNavProps {
  surveyData: SurveyFormDataPayloadType;
  activeKey: SurveyActiveKeyType;
  setActiveKey: (key: SurveyActiveKeyType) => void;
}

export const SurveyLeftNav = (props: SurveyLeftNavProps) => {
  const { surveyData, activeKey, setActiveKey } = props;
  const { data: surveyFormData } = surveyData;
  return (
    <>
      {isEmpty(activeKey.value) ? (
        <div className={'pl-[40px] pt-[40px] pb-[37px] relative'}>
          <div
            className={'w-[668px] h-[963px] rounded-2xl'}
            style={{
              background: `url(${surveyFormData.image_url}), lightgray 50% / cover no-repeat`,
            }}
          ></div>
          <div className={'absolute top-[457px] left-[115px]'}>
            <ColdWordmark
              color={HexColors.white}
              className={'w-[152.276px] h-[48px]'}
            />
          </div>
        </div>
      ) : (
        <div className={'pl-[40px]'}>
          <div className={'pr-[12px]'}>
            <SurveySectionsProgress
              sections={surveyFormData.sections}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
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
