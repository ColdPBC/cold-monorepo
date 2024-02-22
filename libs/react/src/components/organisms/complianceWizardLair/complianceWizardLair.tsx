import { BaseButton, Card, Spinner, WizardContext } from '@coldpbc/components';
import { PropsWithChildren, useContext } from 'react';
import useSWR from 'swr';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';

export interface ComplianceWizardLairProps {
  name: string;
}

export const ComplianceWizardLair = (props: PropsWithChildren<ComplianceWizardLairProps>) => {
  const { children, name } = props;
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  const { logError } = useColdContext();
  const { setCurrentStep, currentStep, prevStep, nextStep } = useContext(WizardContext);
  const compliances = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>(orgId ? [`/compliance_definitions/organization/${orgId}`, 'GET'] : null, axiosFetcher);

  const backOutOfWizard = () => {
    navigate('/compliance');
  };

  if (compliances.isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error) {
    if (compliances.error) {
      logError(compliances.error, ErrorType.SWRError);
    }
    if (orgCompliances.error) {
      logError(orgCompliances.error, ErrorType.SWRError);
    }
    return null;
  }

  if (compliances.data && orgCompliances.data) {
    const compliance = compliances.data.find(compliance => compliance.name === name);

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
                setCurrentStep('automate');
              }}
            />
            <BaseButton
              label={'Upload'}
              variant={ButtonTypes.primary}
              onClick={() => {
                setCurrentStep('documents');
              }}
            />
            <BaseButton
              label={'Save and Exit'}
              variant={ButtonTypes.primary}
              onClick={() => {
                backOutOfWizard();
              }}
            />
          </div>
        </div>
        <div className={'flex flex-row justify-between w-full space-x-4'}>
          <Card className={'w-full'} title={'Questionnaire Progress'}></Card>
          <Card
            className={'w-full'}
            title={'Assessment Preview'}
            ctas={[
              {
                text: 'See Full Progress Assessment',
                action: () => {
                  navigate('/assessments');
                },
                variant: ButtonTypes.primary,
              },
            ]}></Card>
        </div>
        {children}
      </div>
    );
  } else {
    return null;
  }
};
