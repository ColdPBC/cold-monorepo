import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { find, forEach, get } from 'lodash';
import { ColdIcon, ColdLeftArrowIcon, ComplianceManagerOverview, ErrorFallback, Spinner } from '@coldpbc/components';
import React, { useContext, useEffect, useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { format } from 'date-fns';
import { withErrorBoundary } from 'react-error-boundary';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { ComplianceManagerCountsPayload, ComplianceSidebarPayload, CurrentAIStatusPayload, MQTTComplianceManagerPayload, OrgCompliance } from '@coldpbc/interfaces';
import useSWRSubscription from 'swr/subscription';
import useSWR from 'swr';
import { axiosFetcher, resolveNodeEnv } from '@coldpbc/fetchers';
import { getTermString } from '@coldpbc/lib';

const _ComplianceManager = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const navigate = useNavigate();
  const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);
  const [managementView, setManagementView] = useState<string>('Overview');
  const [status, setStatus] = useState<ComplianceManagerStatus>(ComplianceManagerStatus.notActivated);
  const { logBrowser } = useColdContext();

  const getSectionGroupDataUrl = () => {
    return [`/compliance/${name}/organizations/${orgId}/section_groups/responses`, 'GET'];
  };

  const sectionGroups = useSWR<ComplianceSidebarPayload, any, any>(getSectionGroupDataUrl(), axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>(orgId ? [`/compliance_definitions/organizations/${orgId}`, 'GET'] : null, axiosFetcher);
  const files = useOrgSWR<any[], any>([`/files`, 'GET'], axiosFetcher);

  const topic = `ui/${resolveNodeEnv()}/${orgId}/${name}/complianceManagementPage`;
  const { data, error } = useSWRSubscription(topic, subscribeSWR) as {
    data: MQTTComplianceManagerPayload | undefined;
    error: any;
  };
  const getCurrentAIStatusTopic = () => {
    if (orgId) {
      return `ui/${resolveNodeEnv()}/${orgId}/${name}/currentAiStatus`;
    } else {
      return ``;
    }
  };
  const currentAIStatus = useSWRSubscription(getCurrentAIStatusTopic(), subscribeSWR) as {
    data: CurrentAIStatusPayload | undefined;
    error: any;
  };

  const getCountsDataUrl = () => {
    return [`/compliance/${name}/organizations/${orgId}/responses/counts`, 'GET'];
  };

  const countsDataSWR = useSWR<ComplianceManagerCountsPayload, any, any>(getCountsDataUrl(), axiosFetcher);

  const compliance = data?.compliance_definition;

  const publishSectionGroupMessage = () => {
    publishMessage(
      `platform/${resolveNodeEnv()}/compliance/getComplianceSectionGroupList`,
      JSON.stringify({
        reply_to: topic,
        resource: 'complianceSectionGroupListByOrgIdCompNameKey',
        method: 'GET',
        compliance_set_name: name,
      }),
    );
  };

  useEffect(() => {
    if (client?.current && connectionStatus) {
      publishSectionGroupMessage();
    }
  }, [connectionStatus, name, publishMessage, client]);

  useEffect(() => {
    if (orgCompliances) {
      // check to see is the compliance is in the orgCompliances
      const orgCompliance = find(orgCompliances.data, { compliance_definition: { name } });
      if (orgCompliance) {
        logBrowser(`Setting ${name} compliance manager status to activated`, 'info', { name, orgCompliance });
        setStatus(ComplianceManagerStatus.activated);
        if (files.data && files.data.length > 0) {
          logBrowser(`Setting ${name} compliance manager status to uploaded documents`, 'info', { name, files });
          setStatus(ComplianceManagerStatus.uploadedDocuments);
          if (currentAIStatus?.data && currentAIStatus.data.length > 0) {
            logBrowser(`Setting ${name} compliance manager status to started AI`, 'info', { name, currentAIStatus });
            setStatus(ComplianceManagerStatus.startedAi);
          } else {
            // check the compliance counts to see if the AI has been run
            const complianceSectionGroupCounts = countsDataSWR.data?.compliance_section_groups;
            let aiAnswered = 0;
            let userAnswered = 0;
            let totalQuestions = 0;
            forEach(complianceSectionGroupCounts, (value, key) => {
              aiAnswered += value.counts.ai_answered;
              userAnswered += value.counts.org_answered;
              totalQuestions += value.counts.not_started + value.counts.ai_answered + value.counts.org_answered;
            });
            if (totalQuestions > 0) {
              if (aiAnswered > 0 && userAnswered === 0) {
                logBrowser(`Setting ${name} compliance manager status to completed AI`, 'info', {
                  name,
                  complianceSectionGroupCounts,
                  aiAnswered,
                  totalQuestions,
                  userAnswered,
                });
                setStatus(ComplianceManagerStatus.completedAi);
              } else if (aiAnswered > 0 && userAnswered > 0) {
                logBrowser(`Setting ${name} compliance manager status to started questions`, 'info', {
                  name,
                  complianceSectionGroupCounts,
                  aiAnswered,
                  totalQuestions,
                  userAnswered,
                });
                setStatus(ComplianceManagerStatus.startedQuestions);
              }

              if (totalQuestions === userAnswered) {
                logBrowser(`Setting ${name} compliance manager status to completed questions`, 'info', {
                  name,
                  complianceSectionGroupCounts,
                  aiAnswered,
                  totalQuestions,
                  userAnswered,
                });
                setStatus(ComplianceManagerStatus.completedQuestions);
              }
            }

            const statuses = data?.statuses;
            if (statuses && statuses.length > 0) {
              const recentStatus = statuses[0];
              if (recentStatus.type === 'user_submitted') {
                logBrowser(`Setting ${name} compliance manager status to submitted`, 'info', { name, recentStatus });
                setStatus(ComplianceManagerStatus.submitted);
              }
            }
          }
        }
      }
    }
  }, [orgCompliances, files, currentAIStatus, countsDataSWR, name, data]);

  useEffect(() => {
    // set interval to check if data is undefined and if so, publish the message again
    const interval = setInterval(() => {
      if (!data) {
        publishSectionGroupMessage();
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    logBrowser('Compliance Definition', 'info', {
      name,
      data,
      error,
      orgId,
      compliance,
      status,
      managementView,
      orgCompliances,
      topic,
      currentAIStatus: currentAIStatus.data,
      files: files.data,
    });
  }, [orgCompliances, files, currentAIStatus, name, data, error, orgId, compliance, status, managementView, topic]);

  if (!data || orgCompliances.isLoading || files.isLoading || countsDataSWR.isLoading || sectionGroups.isLoading) {
    return <Spinner />;
  }

  const term = get(data, 'compliance_definition.metadata.term', undefined);
  const due_date = get(data, 'compliance_definition.metadata.due_date', undefined);
  let termString = '';
  if (term) {
    termString = getTermString(term);
  }

  const getActiveTabElement = (tab: string) => {
    switch (tab) {
      default:
        return <ComplianceManagerOverview />;
    }
  };

  return (
    <ColdComplianceManagerContext.Provider
      value={{
        data: {
          mqttComplianceSet: data,
          files: files,
          name: name || '',
          currentAIStatus: currentAIStatus?.data,
          orgCompliances: orgCompliances?.data,
          complianceCounts: countsDataSWR,
          sectionGroups: sectionGroups,
        },
        status: status,
        setStatus: setStatus,
        showOverviewModal: showOverviewModal,
        setShowOverviewModal: setShowOverviewModal,
      }}>
      <div className={'flex flex-col w-full gap-[48px] justify-center relative mb-[40px]'}>
        <div className={'absolute top-0 w-full h-[179px]'}>
          <img className={'w-full h-full object-cover'} src={compliance?.image_url} alt={compliance?.name} />
        </div>
        <div className={'w-full h-[281px] flex flex-col gap-[47px] justify-between relative'} data-testid={'compliance-manager-header'}>
          <div
            className={'w-full px-[16px] py-[8px] text-button text-tc-primary flex flex-row gap-[1px] items-center bg-[#1f202e80] cursor-pointer justify-start'}
            onClick={() => navigate('/compliance')}>
            <ColdLeftArrowIcon className={'w-[24px] h-[24px]'} />
            <div>Compliance Sets</div>
          </div>
          <div className={'flex flex-row gap-[10px] px-[70px] items-end w-full'}>
            <div className={'h-[194px] w-[194px] rounded-full bg-gray-50 flex items-center justify-center'}>
              <img className={'w-[120px] h-[120px] invert'} src={compliance?.logo_url} alt={compliance?.name} />
            </div>
            <div className={'flex flex-col justify-start'}>
              <div className={'text-[40px] font-bold leading-[60px] text-tc-primary'}>{compliance?.title}</div>
              <div className={'flex flex-row gap-[32px]'}>
                {due_date && (
                  <div className={'flex flex-row gap-[4px] items-center'}>
                    <ColdIcon name={IconNames.ColdCalendarDaysIcon} className={'w-[24px] h-[24px]'} />
                    <div className={'text-body text-tc-secondary'}>{new Date(due_date).getFullYear()} Compliance Set</div>
                  </div>
                )}
                {termString.length > 0 && (
                  <div className={'flex flex-row gap-[4px] items-center'}>
                    <ColdIcon name={IconNames.ColdClockIcon} className={'w-[24px] h-[24px]'} />
                    <div className={'text-body text-tc-secondary'}>{termString}</div>
                  </div>
                )}
                <div className={'flex flex-row gap-[4px] items-center'}>
                  <ColdIcon name={IconNames.ColdCalendarEventIcon} className={'w-[24px] h-[24px]'} />
                  <div className={'text-body text-tc-secondary'}>{due_date ? format(new Date(due_date), 'MMMM d, yyyy') : 'Ongoing'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col w-full gap-[48px] px-[64px] justify-items-center items-center'}>
          <div className={'flex flex-col justify-center relative w-full max-w-[1400px]'} data-testid={'compliance-manager-tabs'}>
            <div className={'absolute bottom-0 left-0 h-[2px] bg-gray-90 w-full'}></div>
            <div className={'flex flex-row w-full justify-start'} data-testid={'compliance-manager-tabs'}>
              {['Overview', 'Documents', 'Preview'].map(tab => (
                <div
                  className={`px-[16px] py-[8px] text-h5 cursor-pointer relative ` + (managementView === tab ? 'text-tc-primary' : 'text-tc-disabled')}
                  onClick={() => setManagementView(tab)}
                  key={tab}>
                  {tab}
                  {managementView === tab && <div className={'absolute bottom-0 left-0 w-full h-[4px] bg-primary-300'}></div>}
                </div>
              ))}
            </div>
          </div>
          <div className={'flex flex-row justify-center w-full max-w-[1400px]'}>{getActiveTabElement(managementView)}</div>
        </div>
      </div>
    </ColdComplianceManagerContext.Provider>
  );
};

export const ComplianceManager = withErrorBoundary(_ComplianceManager, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManager: ', error);
  },
});
