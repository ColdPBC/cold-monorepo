import { QuestionnaireQuestionComplianceResponse } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { getAIOriginalAnswer, getComplianceAIResponseValue } from '@coldpbc/lib';
import { AiDocumentReferenceDropdown, ErrorFallback } from '@coldpbc/components';
import { isNull } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const _QuestionnaireAIDetail = (props: {
  aiDetails:
    | {
        ai_response: QuestionnaireQuestionComplianceResponse['ai_response'];
        ai_answered?: boolean;
        ai_attempted?: boolean;
        value?: any | undefined;
        questionAnswerSaved: boolean;
        questionAnswerChanged: boolean;
      }
    | undefined;
}) => {
  const { aiDetails } = props;
  if (aiDetails === undefined) {
    return null;
  }
  const { ai_response, ai_answered, ai_attempted, value, questionAnswerSaved, questionAnswerChanged } = aiDetails;

  const getAiTag = () => {
    let text = 'Low Confidence';
    let color = HexColors.bgc.accent;
    if (isNull(getComplianceAIResponseValue)) {
      return null;
    }

    if (!ai_answered) {
      text = 'Low Confidence';
      color = HexColors.bgc.accent;
    } else {
      if (value === ai_response?.answer) {
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
            <div className={'text-body font-bold w-full text-start'}>Original Answer: {getAIOriginalAnswer(ai_response)}</div>
            <div className={'text-body w-full text-start'}>{ai_response?.justification}</div>
            <div className={'flex flex-col gap-[8px] w-full'}>
              <div className={'text-h5'}>Documents Referenced</div>
              {ai_response?.references?.map((reference, index) => {
                return <AiDocumentReferenceDropdown key={index} reference={reference} />;
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
