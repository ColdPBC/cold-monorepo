import { ColdLeftArrowIcon, QuestionnaireContainer, QuestionnaireDetailSidebar, QuestionnaireSidebar, Spinner } from '@coldpbc/components';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { OrgCompliance, QuestionnaireQuestion } from '@coldpbc/interfaces';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';

export const ComplianceQuestionnaire = () => {
  const [activeQuestion, setActiveQuestion] = React.useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = React.useState<boolean>(true);
  const [focusQuestion, setFocusQuestion] = React.useState<{
    key: string;
    aiDetails: {
      ai_response?: QuestionnaireQuestion['ai_response'];
      ai_answered?: boolean;
      ai_attempted?: boolean;
      value?: any;
      questionAnswerSaved: boolean;
      questionAnswerChanged: boolean;
    };
  } | null>(null);
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  // expected pathname: /questionnaire/:complianceName
  const { complianceName } = useParams();
  const getComplianceUrl = () => {
    if (orgId) {
      return [`/compliance_definitions/organizations/${orgId}`, 'GET'];
    } else {
      return null;
    }
  };
  const complianceSWR = useSWR<OrgCompliance[], any, any>(getComplianceUrl(), axiosFetcher);

  useEffect(() => {
    if (focusQuestion) {
      setSidebarExpanded(false);
    }
  }, [focusQuestion]);

  if (complianceSWR.isLoading) {
    return <Spinner />;
  }

  const selectedCompliance = complianceSWR.data?.find(compliance => compliance.compliance_definition.name === complianceName);

  return (
    <ColdComplianceQuestionnaireContext.Provider
      value={{
        name: complianceName || '',
        activeQuestion,
        setActiveQuestion,
        focusQuestion,
        setFocusQuestion,
      }}>
      <div className={'w-full h-screen flex-col flex text-tc-primary relative'}>
        <div className={'h-[72px] w-full p-[16px] flex justify-between bg-gray-30'} data-testid={'questionnaire-header'}>
          <div
            className={'w-full gap-[16px] py-[8px] text-button text-tc-primary flex flex-row items-center cursor-pointer justify-start'}
            onClick={() => navigate(`/compliance/${complianceName}`)}>
            <ColdLeftArrowIcon className={'w-[40px] h-[40px]'} />
            <div>Back to {selectedCompliance && selectedCompliance.compliance_definition.title}</div>
          </div>
        </div>
        {selectedCompliance ? (
          <div className={'w-full h-full flex justify-start'}>
            <QuestionnaireSidebar sidebarOpen={sidebarExpanded} setSidebarOpen={setSidebarExpanded} />
            <QuestionnaireContainer />
            <QuestionnaireDetailSidebar />
          </div>
        ) : (
          <div>Compliance not found/activated. Go back to Compliance Set manager to activate.</div>
        )}
      </div>
    </ColdComplianceQuestionnaireContext.Provider>
  );
};
