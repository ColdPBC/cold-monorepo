import React, { useContext, useEffect } from 'react';
import { ComplianceSurveyLeftNav, ComplianceSurveyQuestionnaire, ComplianceSurveyRightNav, ErrorFallback, Spinner, Takeover, WizardContext } from '@coldpbc/components';
import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { getStartingKey, sortComplianceSurvey } from '@coldpbc/lib';
import { GlobalSizes } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

const _SurveyComplianceFlowStep = () => {
  const { data } = useContext(WizardContext);
  const { surveyData } = data as { surveyData: ComplianceSurveyPayloadType };
  const [activeKey, setActiveKey] = React.useState<ComplianceSurveyActiveKeyType>({
    value: '',
    section: '',
    category: '',
    isFollowUp: false,
    previousValue: '',
  });
  const [surveyOpen, setSurveyOpen] = React.useState(false);
  const sortedSurvey = sortComplianceSurvey(surveyData);
  const [surveyState, setSurveyState] = React.useState<ComplianceSurveyPayloadType>(sortedSurvey);

  useEffect(() => {
    // set start active key
    if (!surveyData) {
      return;
    }
    const key = getStartingKey(surveyData);
    setActiveKey(key);
  }, []);

  if (!sortedSurvey) {
    return null;
  }

  if (activeKey.section === '') {
    return <Spinner size={GlobalSizes.xLarge} />;
  }

  return (
    <div className={'h-[708px] w-full flex flex-row relative text-tc-primary'}>
      <div className={'flex w-auto h-full'}>
        <ComplianceSurveyLeftNav complianceSet={surveyState} activeKey={activeKey} setActiveKey={setActiveKey} />
      </div>
      <div className={'flex w-full h-full'}>
        <ComplianceSurveyRightNav surveyData={surveyState} activeKey={activeKey} setActiveKey={setActiveKey} surveyOpen={surveyOpen} setSurveyOpen={setSurveyOpen} />
      </div>
      <Takeover
        show={surveyOpen}
        setShow={setSurveyOpen}
        className={'absolute h-full w-full p-[30px] bg-transparent'}
        containClassName={'bg-bgc-elevated rounded-lg'}
        header={{
          dismiss: {
            dismissible: true,
            onClick: () => {
              setSurveyOpen(false);
            },
          },
        }}>
        <ComplianceSurveyQuestionnaire
          surveyData={surveyState}
          setSurveyData={setSurveyState}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          submitSurvey={() => {
            setSurveyOpen(false);
          }}
        />
      </Takeover>
    </div>
  );
};

export const SurveyComplianceFlowStep = withErrorBoundary(_SurveyComplianceFlowStep, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SurveyComplianceFlowStep: ', error);
  },
});
