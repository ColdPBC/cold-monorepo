import React from 'react';
import { SurveyDefinitionType } from '@coldpbc/interfaces';
import ReactMarkdown from 'react-markdown';
import { BaseButton } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';

export interface SurveyIntroProps {
  surveyFormData: SurveyDefinitionType;
  onSurveyStart: () => void;
}

export const SurveyIntro = (props: SurveyIntroProps) => {
  const { surveyFormData, onSurveyStart } = props;

  const { intro_markdown, title } = surveyFormData;

  return (
    <div className={'w-[580px] space-y-[32px]'}>
      <div className={'text-h2 text-tc-primary'}>{title}</div>
      <ReactMarkdown
        className={
          'text-tc-primary text-sm not-italic font-medium whitespace-pre-line'
        }
      >
        {intro_markdown}
      </ReactMarkdown>
      <div className={'w-full flex justify-start'}>
        <BaseButton
          label={'Start'}
          onClick={onSurveyStart}
          variant={ButtonTypes.primary}
          textSize={GlobalSizes.small}
        />
      </div>
    </div>
  );
};
