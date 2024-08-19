import React from 'react';
import { Card, ErrorFallback, NextStepCard, Spinner } from '@coldpbc/components';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { AllCompliance } from '@coldpbc/interfaces';
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorType } from '@coldpbc/enums';
import useSWR from 'swr';

const _NextSteps = () => {
  const { orgId } = useAuth0Wrapper();
  const allCompliances = useSWR<AllCompliance[], any, any>([`/compliance/all/organizations/${orgId}`, 'GET'], axiosFetcher);

  const { logError, logBrowser } = useColdContext();
  const navigate = useNavigate();

  if (allCompliances.isLoading) {
    return <Spinner />;
  }

  if (allCompliances.error) {
    logBrowser('Error fetching surveys', 'error', { ...allCompliances.error }, allCompliances.error);
    logError(allCompliances.error, ErrorType.SWRError);
    return;
  }

  logBrowser('Next steps loaded', 'info', {
    orgId,
  });

  if (!allCompliances.data?.length) {
    return null;
  }

  const nextSteps = allCompliances.data
    .map(compliance => {
      const progress = compliance.progress || 0;
      return {
        compliance: compliance,
        name: compliance.name,
        title: compliance.title,
        started: progress > 0,
        surveyProgress: progress,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .sort((a, b) => {
      return b.surveyProgress - a.surveyProgress;
    })
    .splice(0, 3);

  if (!nextSteps?.length) {
    return null;
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
                    navigate(`/compliance/${nextStep.compliance.name}`);
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
