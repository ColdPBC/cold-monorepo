import React from 'react';
import { Card, ErrorFallback, ProgressBar } from '@coldpbc/components';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { get } from 'lodash';

export interface ComplianceProgressCardProps {
  surveyData: ComplianceSurveyPayloadType;
}

const _ComplianceProgressCard = (props: ComplianceProgressCardProps) => {
  const { surveyData } = props;
  const totalQuestions = get(surveyData, 'definition.progress.question_count', 0);
  const totalComplete = get(surveyData, 'definition.progress.questions_answered', 0);
  const totalNeedsReview = get(surveyData, 'definition.progress.total_review', 0);
  const totalUnanswered = totalQuestions - totalComplete;

  const shades = [];

  if (totalComplete > 0) {
    shades.push({
      color: HexColors.primary.DEFAULT,
      percentage: (totalComplete / totalQuestions) * 100,
    });
  }
  if (totalNeedsReview > 0) {
    shades.push({
      color: HexColors.primary['100'],
      percentage: (totalNeedsReview / totalQuestions) * 100,
    });
  }

  const textArray = [];
  if (totalComplete > 0) {
    textArray.push(`${totalComplete} Complete`);
  }
  if (totalNeedsReview > 0) {
    textArray.push(`${totalNeedsReview} To Review`);
  }
  if (totalUnanswered > 0) {
    textArray.push(`${totalUnanswered} To Answer`);
  }

  const percentage = totalQuestions === 0 ? 0 : (totalComplete / totalQuestions) * 100;

  return (
    <Card title={'Questionnaire Progress'} className={'w-1/2'}>
      <Card glow={false} className={'w-full bg-bgc-elevated border-[1px] border-bgc-accent'}>
        <div className={'w-full flex flex-col space-y-[10px]'}>
          <ProgressBar shades={shades} />
          <div className={'flex flex-row text-tc-primary text-body justify-between'}>
            <div className={'text-left'}>{textArray.join(', ')}</div>
            <div>{`(${percentage.toFixed(0)}% Complete)`}</div>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export const ComplianceProgressCard = withErrorBoundary(_ComplianceProgressCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceProgressCard: ', error);
  },
});
