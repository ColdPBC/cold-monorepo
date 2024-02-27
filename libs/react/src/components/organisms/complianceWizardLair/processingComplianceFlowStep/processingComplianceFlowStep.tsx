import React, { useContext, useEffect } from 'react';
import { Spinner, WizardContext } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import { getComplianceProgressForSurvey } from '@coldpbc/lib';

export const ProcessingComplianceFlowStep = () => {
  const { nextStep, data } = useContext(WizardContext);
  const { surveyData } = data;

  useEffect(() => {
    if (surveyData) {
      const complianceProgress = getComplianceProgressForSurvey(surveyData);
      if (complianceProgress.aiAttemptedQuestions !== 0) {
        if (complianceProgress.aiAttemptedQuestions === complianceProgress.totalQuestions) {
          nextStep();
        }
      }
    }
  }, [surveyData]);

  return (
    <div className={'h-[653px] w-full flex justify-center items-center text-tc-primary'}>
      <div className={'w-[827px] flex flex-col space-y-4'}>
        <div className={'text-h1 text-left'}>Hang tight! Automation in progress.</div>
        <div className={'text-body text-left'}>
          Cold Climate is working to pre-fill the form. This page will automatically update and we’ll send you an email when it’s complete.
        </div>
        <div className={'w-full flex justify-center'}>
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </div>
    </div>
  );
};
