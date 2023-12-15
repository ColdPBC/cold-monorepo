import React from 'react';
import { Card, ErrorFallback, NextStepCard, Spinner } from '@coldpbc/components';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { SurveyNextStep, SurveyPayloadType } from '@coldpbc/interfaces';
import { startCase } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorType } from '@coldpbc/enums';

const _NextSteps = () => {
  const { data, isLoading, error } = useOrgSWR<SurveyPayloadType[]>(['/surveys', 'GET'], axiosFetcher);
  const { logError } = useColdContext();
  const navigate = useNavigate();

  const getSurveyProgress = (survey: SurveyPayloadType): number => {
    let totalQuestions = 0;
    let completedQuestions = 0;
    Object.keys(survey.definition.sections).forEach(section => {
      const sectionData = survey.definition.sections[section];
      if (sectionData.component !== null) {
        totalQuestions += 1;
        if (sectionData.skipped !== undefined && sectionData.value !== undefined) {
          completedQuestions += 1;
        }
      }
      Object.keys(sectionData.follow_up).forEach(followUp => {
        const followUpData = sectionData.follow_up[followUp];
        totalQuestions += 1;
        if (followUpData.skipped !== undefined && followUpData.value !== undefined) {
          completedQuestions += 1;
        }
      });
    });
    if (completedQuestions === 0) {
      return 0;
    } else {
      return Math.round((completedQuestions / totalQuestions) * 100);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    logError(error, ErrorType.SWRError);
    return <div></div>;
  }

  const nextSteps = data
    ?.filter(survey => {
      return !survey.definition.submitted;
    })
    .sort((a, b) => {
      const aDate = new Date(a.updated_at);
      const bDate = new Date(b.updated_at);
      return bDate.getTime() - aDate.getTime();
    })
    .map((survey): SurveyNextStep => {
      const progress = getSurveyProgress(survey);
      return {
        name: survey.name,
        title: startCase(survey.name),
        started: progress > 0,
        surveyProgress: progress,
      };
    });

  if (!nextSteps?.length) {
    return <div></div>;
  } else {
    return (
      <Card data-testid="next-steps-card" title={'Next Steps'} className={'max-w-[668px]'}>
        <div className={'space-y-6 w-full'}>
          {nextSteps?.map(nextStep => {
            return (
              <div key={nextStep.title} data-testid={`next-step-card`}>
                <NextStepCard
                  nextStep={nextStep}
                  onNextStepClick={() => {
                    navigate(`?surveyName=${nextStep.name}`);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
};

export const NextSteps = withErrorBoundary(_NextSteps, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
