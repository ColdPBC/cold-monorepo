import { AIDetails } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { getComplianceAIResponseOriginalAnswer, isComplianceAnswerEqualToAIResponse } from '@coldpbc/lib';
import { AiReferenceDropdown, ErrorFallback } from '@coldpbc/components';
import { get, isNull } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

export interface QuestionnaireAIDetailProps {
  aiDetails: AIDetails | undefined | null;
}

const _QuestionnaireAIDetail = (props: QuestionnaireAIDetailProps) => {
  const { aiDetails } = props;
  if (aiDetails === undefined || aiDetails === null) {
    return null;
  }
  const { questionAnswerSaved, question } = aiDetails;

  const ai_response = get(question, 'compliance_responses[0].ai_response', null);
  const ai_answered = question.ai_answered;

  const getAiTag = () => {
    let text = 'Low Confidence';
    let color = HexColors.bgc.accent;
    if (isNull(ai_response)) {
      return null;
    }

    if (!ai_answered) {
      text = 'Low Confidence';
      color = HexColors.bgc.accent;
    } else {
      if (isComplianceAnswerEqualToAIResponse(aiDetails)) {
        // tell the difference between accepted and ready for review
        if (questionAnswerSaved) {
          text = 'Accepted';
          color = HexColors.green['1000'];
        } else {
          text = 'Ready for Review';
          color = HexColors.yellow['1000'];
        }
      } else {
        text = 'Not Accepted';
        color = HexColors.yellow['1000'];
      }
    }

    return (
      <div
        className={'rounded-[100px] flex flex-row py-[4px] px-[16px] text-body text-center items-center justify-center'}
        style={{
          backgroundColor: color,
        }}>
        {text}
      </div>
    );
  };

  const getOriginalAnswer = () => {
    if (ai_answered) {
      return <div className={'text-body font-bold w-full text-start'}>Original Answer: {getComplianceAIResponseOriginalAnswer(question)}</div>;
    } else {
      return null;
    }
  };

  return (
    <div className={'w-full h-full flex flex-col p-[24px] gap-[16px] text-tc-primary'}>
      <div className={'w-full flex flex-row gap-[16px] justify-between'}>
        <span className={'text-h4 text-start'} aria-labelledby={'ai-response'} role={'img'}>
          ✨ Cold AI
        </span>
        {getAiTag()}
      </div>
      <div className={'flex flex-col gap-[24px]'}>
        {ai_response ? (
          <>
            {getOriginalAnswer()}
            <div className={'text-body w-full text-start'}>{ai_response?.justification}</div>
            <div className={'flex flex-col gap-[8px] w-full'}>
              {ai_response?.references && ai_response?.references?.length > 0 && <div className={'text-h5'}>Documents Referenced</div>}
              {ai_response?.references?.map((reference, index) => {
                return <AiReferenceDropdown key={index} reference={reference} />;
              })}
            </div>
          </>
        ) : (
          <div className={'text-body text-tc-secondary w-full text-start'}>Cold AI has not been run on this question.</div>
        )}
      </div>
    </div>
  );
};

export const QuestionnaireAIDetail = withErrorBoundary(_QuestionnaireAIDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in QuestionnaireAIDetail: ', error);
  },
});
