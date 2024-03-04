import React from 'react';
import { Card, ErrorFallback, ProgressBar } from '@coldpbc/components';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { sumBy } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceProgressCardProps {
  surveyData: ComplianceSurveyPayloadType;
}

const _ComplianceProgressCard = (props: ComplianceProgressCardProps) => {
  const { surveyData } = props;
  const { progress } = surveyData.definition;
  const totalQuestions = sumBy(progress, value => {
    return value.total;
  });
  const totalComplete = sumBy(progress, value => {
    return value.answered;
  });
  const totalNeedsReview = sumBy(progress, value => {
    return value.review;
  });
  const totalUnanswered = totalQuestions - (totalComplete + totalNeedsReview);

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

  return (
    <Card title={'Questionnaire Progress'} className={'w-1/2'}>
      <div className={'w-full flex flex-col space-y-[10px]'}>
        <ProgressBar shades={shades} />
        <div className={'flex flex-row text-tc-primary text-body justify-between'}>
          <div className={'text-left'}>{textArray.join(', ')}</div>
          <div>{`(${((totalComplete / totalQuestions) * 100).toFixed(2)}% Complete)`}</div>
        </div>
      </div>
    </Card>
  );
};

export const ComplianceProgressCard = withErrorBoundary(_ComplianceProgressCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceProgressCard: ', error);
  },
});
