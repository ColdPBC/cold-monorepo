import { ColdLeftArrowIcon, QuestionnaireSidebar, Spinner } from '@coldpbc/components';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { OrgCompliance } from '@coldpbc/interfaces';
import { getQuestionnaireSidebarComplianceMock } from '@coldpbc/mocks';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';

export const ComplianceQuestionnaire = () => {
  const [activeQuestion, setActiveQuestion] = React.useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  // expected pathname: /questionnaire/:complianceName
  const route = location.pathname;
  const complianceName = route.split('/')[1];
  const getComplianceUrl = () => {
    if (orgId) {
      return [`/compliance_definitions/organizations/${orgId}`, 'GET'];
    } else {
      return null;
    }
  };
  const complianceSWR = useSWR<OrgCompliance[], any, any>(getComplianceUrl(), axiosFetcher);

  if (complianceSWR.isLoading) {
    return <Spinner />;
  }

  const selectedCompliance = complianceSWR.data?.find(compliance => compliance.compliance_definition.name === complianceName);

  if (!selectedCompliance) {
    return <div>Compliance not found/activated.</div>;
  }

  return (
    <ColdComplianceQuestionnaireContext.Provider
      value={{
        activeQuestion,
        setActiveQuestion,
      }}>
      <div className={'w-full h-full flex-col flex'}>
        <div className={'h-[72px] w-full p-[16px] flex justify-between bg-gray-30'} data-testid={'questionnaire-header'}>
          <div
            className={'w-full gap-[16px] py-[8px] text-button text-tc-primary flex flex-row items-center cursor-pointer justify-start'}
            onClick={() => navigate(`/compliance/${complianceName}`)}>
            <ColdLeftArrowIcon className={'w-[40px] h-[40px]'} />
            <div>{complianceName}</div>
          </div>
        </div>
        <div className={'w-full h-full flex justify-start'}>
          <QuestionnaireSidebar sectionGroups={getQuestionnaireSidebarComplianceMock()} />
          <div className={'w-full h-full pt-[24px]'}></div>
        </div>
      </div>
    </ColdComplianceQuestionnaireContext.Provider>
  );
};
