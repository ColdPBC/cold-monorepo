import React, { useContext, useEffect } from 'react';
import { ErrorFallback, Spinner, WizardContext } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import { getComplianceProgressForSurvey } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext } from '@coldpbc/hooks';

const _ProcessingComplianceFlowStep = () => {
  const { nextStep, data } = useContext(WizardContext);
  const { logBrowser } = useColdContext();
  const { surveyData } = data;

  useEffect(() => {
    if (surveyData) {
      const complianceProgress = getComplianceProgressForSurvey(surveyData);
      if (complianceProgress.aiAttemptedQuestions !== 0) {
        logBrowser('Compliance set automation progress update', 'info', {
          complianceProgress,
          data,
        });
        if (complianceProgress.aiAttemptedQuestions === complianceProgress.totalQuestions) {
          logBrowser('Compliance set automation complete. Going to next step', 'info', {
            complianceProgress,
            data,
          });
          nextStep();
        }
      }
    }
  }, [surveyData]);

  return (
    <div className={'h-[653px] w-full flex justify-center items-center text-tc-primary'}>
      <div className={'w-[827px] flex flex-col space-y-4'}>
        <div className={'text-h1 text-left'}>Hang tight! Automation in progress.</div>
        <div className={'text-body text-left'}>Cold is working to pre-fill the form. This page will automatically update and we’ll notify you when it’s complete.</div>
        <div className={'w-full flex justify-center'}>
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </div>
    </div>
  );
};

export const ProcessingComplianceFlowStep = withErrorBoundary(_ProcessingComplianceFlowStep, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProcessingComplianceFlowStep: ', error);
  },
});
