import { BaseButton, ComplianceAssessmentsCard, ComplianceProgressCard, WizardContext } from '@coldpbc/components';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { Compliance } from '@coldpbc/interfaces';
import { ButtonTypes } from '@coldpbc/enums';
import { useLocation, useNavigate } from 'react-router-dom';
import { getComplianceProgressForSurvey } from '@coldpbc/lib';
import { isArray } from 'lodash';
import { useColdContext } from '@coldpbc/hooks';

export interface ComplianceWizardLairProps {
  name: string;
}

export const ComplianceWizardLair = (props: PropsWithChildren<ComplianceWizardLairProps>) => {
  const { children, name } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { logBrowser } = useColdContext();
  const { setCurrentStep, data } = useContext(WizardContext);
  const { surveyData, files, baseURL } = data;

  const backOutOfWizard = () => {
    navigate('/compliance');
  };

  useEffect(() => {
    // get the location path. only go to the user last step if the base url is the same as the location path
    const locationPath = location.pathname;
    if (locationPath === baseURL) {
      if (surveyData) {
        const complianceProgress = getComplianceProgressForSurvey(surveyData);
        // avoid all this logic if the number of ai attempted questions is 0.
        // this means the user has not started the automation process, so skip this logic
        if (complianceProgress.aiAttemptedQuestions > 0 || complianceProgress.answeredQuestions > 0) {
          logBrowser('Automatically navigating to compliance questionnaire step', 'info', {
            complianceProgress,
            locationPath,
            data,
          });
          setCurrentStep('questionnaire');
          return;
        }
      }

      if (files && isArray(files) && files.length > 0) {
        logBrowser('Automatically navigating to compliance automate step', 'info', {
          locationPath,
          data,
        });
        setCurrentStep('automate');
        return;
      }

      logBrowser('Automatically navigating to compliance document upload step', 'info', {
        locationPath,
        data,
      });
      setCurrentStep('documents');
      return;
    }
  }, [surveyData, files, location.pathname]);

  const compliance = data['compliances'].find((compliance: Compliance) => compliance.name === name);

  return (
    <div className={'text-tc-primary flex flex-col space-y-10 justify-center items-center w-full'}>
      <div className={'flex flex-row justify-between w-full'}>
        <div className={'w-[138px] h-[138px] flex justify-center items-center bg-white rounded-2xl'}>
          <img src={`${compliance?.logo_url}`} className={'max-w-[105px] max-h-[88px]'} alt="compliance" />
        </div>
        <div className={'flex flex-row justify-end items-center gap-x-4'}>
          <BaseButton
            label={'Automate'}
            variant={ButtonTypes.primary}
            onClick={() => {
              logBrowser('Navigating to compliance automate step', 'info', {
                compliance,
                data,
              });
              setCurrentStep('automate');
            }}
          />
          <BaseButton
            label={'Upload'}
            variant={ButtonTypes.primary}
            onClick={() => {
              logBrowser('Navigating to compliance document upload step', 'info', {
                compliance,
                data,
              });
              setCurrentStep('documents');
            }}
          />
          <BaseButton
            label={'Save and Exit'}
            variant={ButtonTypes.primary}
            onClick={() => {
              logBrowser('Navigating to compliance page', 'info', {
                compliance,
                data,
              });
              backOutOfWizard();
            }}
          />
        </div>
      </div>
      <div className={'flex flex-row justify-between w-full space-x-4'}>
        <ComplianceProgressCard surveyData={surveyData} />
        <ComplianceAssessmentsCard surveyData={surveyData} />
      </div>
      {children}
    </div>
  );
};
