import React from 'react';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { Card, ErrorFallback, ProgressBar } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceAssessmentsCardProps {
  surveyData: ComplianceSurveyPayloadType;
}

const _ComplianceAssessmentsCard = (props: ComplianceAssessmentsCardProps) => {
  const { surveyData } = props;
  const percentage = surveyData.progress.percentage;

  return (
    <Card title={'Assessment Preview'} className={'w-1/2 gap-4'}>
      <Card className={'w-full bg-bgc-elevated border-[1px] border-bgc-accent'} glow={false}>
        <div className={'w-full flex flex-col space-y-[10px]'}>
          <ProgressBar
            shades={[
              {
                color: HexColors.primary.DEFAULT,
                percentage,
              },
            ]}
          />
          <div className={'flex flex-row text-tc-primary text-body justify-between'}>
            <div></div>
            <div>{`${percentage.toFixed(0)}% Satisfied`}</div>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export const ComplianceAssessmentsCard = withErrorBoundary(_ComplianceAssessmentsCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceAssessmentsCard: ', error);
  },
});
