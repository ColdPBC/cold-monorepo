import { ColdLeftArrowIcon, ErrorFallback, QuestionnaireContainer, QuestionnaireDetailSidebar, QuestionnaireSidebar, Spinner } from '@coldpbc/components';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { AIDetails, Compliance, ComplianceSidebarPayload } from '@coldpbc/interfaces';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';
import { isAxiosError } from 'axios';

const _ComplianceQuestionnaire = () => {
  const { logBrowser } = useColdContext();
  const [scrollToQuestion, setScrollToQuestion] = React.useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = React.useState<boolean>(true);
  const [focusQuestion, setFocusQuestion] = React.useState<{
    key: string;
    aiDetails: AIDetails;
  } | null>(null);
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  const { complianceName } = useParams();

  const complianceDataSWR = useSWR<Compliance, any, any>([`/compliance/${complianceName}`, 'GET'], axiosFetcher);

  const getSidebarDataUrl = () => {
    return [`/compliance/${complianceName}/organizations/${orgId}/section_groups/responses`, 'GET'];
  };

  const sideBarSWR = useSWR<ComplianceSidebarPayload, any, any>(getSidebarDataUrl(), axiosFetcher);

  useEffect(() => {
    if (focusQuestion) {
      setSidebarExpanded(false);
    }
  }, [focusQuestion]);

  useEffect(() => {
    logBrowser(`ComplianceQuestionnaire loaded for ${complianceName}`, 'info', {
      name: complianceName,
      data: complianceDataSWR.data,
      sidebarData: sideBarSWR.data,
      scrollToQuestion,
      focusQuestion,
      orgId,
    });
  }, [complianceDataSWR.data, sideBarSWR.data, scrollToQuestion, focusQuestion, orgId, complianceName]);

  if (complianceDataSWR.isLoading || sideBarSWR.isLoading) {
    return <Spinner />;
  }

  if (!sideBarSWR.data || isAxiosError(complianceDataSWR.data)) {
    logBrowser('ComplianceQuestionnaire failed to load', 'error', {
      complianceName,
      complianceDataSWR,
      sideBarSWR,
      orgId,
    });
    return null;
  }

  const selectedCompliance = complianceDataSWR.data;

  return (
    <ColdComplianceQuestionnaireContext.Provider
      value={{
        name: complianceName || '',
        complianceDefinition: selectedCompliance,
        scrollToQuestion,
        setScrollToQuestion,
        focusQuestion,
        setFocusQuestion,
        sectionGroups: sideBarSWR,
      }}>
      <div className={'w-full h-full flex-col flex text-tc-primary relative overflow-y-clip'}>
        <div className={'h-[72px] w-full p-[16px] flex justify-between bg-gray-30'} data-testid={'questionnaire-header'}>
          <div
            className={'w-full gap-[16px] py-[8px] text-button text-tc-primary flex flex-row items-center cursor-pointer justify-start'}
            onClick={() => navigate(`/assessments/${complianceName}`)}>
            <ColdLeftArrowIcon className={'w-[40px] h-[40px]'} />
            <div>Back to {selectedCompliance?.title}</div>
          </div>
        </div>
        {selectedCompliance ? (
          <div className={'w-full h-full flex justify-start relative overflow-y-clip'}>
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

export const ComplianceQuestionnaire = withErrorBoundary(_ComplianceQuestionnaire, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceQuestionnaire: ', error);
  },
});
