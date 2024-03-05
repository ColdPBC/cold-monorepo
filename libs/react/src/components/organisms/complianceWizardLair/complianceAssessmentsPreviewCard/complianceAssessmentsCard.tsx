import React from 'react';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { Card, ErrorFallback, ProgressBar } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceAssessmentsCardProps {
  surveyData: ComplianceSurveyPayloadType;
}

const _ComplianceAssessmentsCard = (props: ComplianceAssessmentsCardProps) => {
  const { surveyData } = props;
  const navigate = useNavigate();
  const percentage = surveyData.definition.progress.percentage * 100;

  return (
    <Card
      title={'Assessment Preview'}
      className={'w-1/2'}
      ctas={[
        {
          text: 'See Full Progress Assessment',
          action: () => {
            navigate('/assessments');
          },
          variant: ButtonTypes.primary,
        },
      ]}>
      <Card className={'w-full bg-bgc-elevated border-[1px] border-bgc-accent'} glow={false}>
        <div className={'w-full flex flex-row justify-between items-center'}>
          <div className={'w-full'}>
            <ProgressBar
              shades={[
                {
                  color: HexColors.primary.DEFAULT,
                  percentage,
                },
              ]}
            />
          </div>
          <div className={'text-tc-primary text-body text-center font-bold w-[210px]'}>{`${percentage.toFixed(0)}% Satisfied`}</div>
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
