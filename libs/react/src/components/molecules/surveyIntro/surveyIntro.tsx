import React from 'react';
import { SurveyFormDefinitionType } from '@coldpbc/interfaces';
import ReactMarkdown from 'react-markdown';
import { BaseButton } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';

export interface SurveyIntroProps {
  surveyFormDefinition: SurveyFormDefinitionType;
  onSurveyStart: () => void;
}

export const SurveyIntro = (props: SurveyIntroProps) => {
  const { surveyFormDefinition, onSurveyStart } = props;
  const { intro_markdown } = surveyFormDefinition;

  return (
    <div className={'w-[580px] space-y-[32px]'}>
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
