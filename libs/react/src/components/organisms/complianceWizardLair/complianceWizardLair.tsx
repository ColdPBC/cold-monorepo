import { BaseButton, Card, Spinner, WizardContext } from '@coldpbc/components';
import { PropsWithChildren, useContext } from 'react';
import { Compliance } from '@coldpbc/interfaces';
import { ButtonTypes } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';

export interface ComplianceWizardLairProps {
  name: string;
}

export const ComplianceWizardLair = (props: PropsWithChildren<ComplianceWizardLairProps>) => {
  const { children, name } = props;
  const navigate = useNavigate();
  const { setCurrentStep, currentStep, data } = useContext(WizardContext);

  const backOutOfWizard = () => {
    navigate('/compliance');
  };

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
              setCurrentStep('processing');
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
};
