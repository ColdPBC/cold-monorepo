import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { forEach, get } from 'lodash';
import { ColdIcon, ColdLeftArrowIcon, ComplianceManagerOverview, ComplianceManagerPreview, ErrorFallback, Spinner } from '@coldpbc/components';
import React, { useContext, useEffect, useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { format } from 'date-fns';
import { withErrorBoundary } from 'react-error-boundary';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { Compliance, ComplianceManagerCountsPayload, ComplianceSidebarPayload, CurrentAIStatusPayload } from '@coldpbc/interfaces';
import useSWRSubscription from 'swr/subscription';
import useSWR from 'swr';
import { axiosFetcher, resolveNodeEnv } from '@coldpbc/fetchers';
import { getTermString } from '@coldpbc/lib';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { isDefined } from 'class-validator';

const _ComplianceManager = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const navigate = useNavigate();
  const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);
  const [managementView, setManagementView] = useState<string>('Overview');
  const [status, setStatus] = useState<ComplianceManagerStatus>(ComplianceManagerStatus.notActivated);
  const { logBrowser } = useColdContext();
  const ldFlags = useFlags();

  const getSectionGroupDataUrl = () => {
    return [`/compliance/${name}/organizations/${orgId}/section_groups/responses`, 'GET'];
  };

  const sectionGroups = useSWR<ComplianceSidebarPayload, any, any>(getSectionGroupDataUrl(), axiosFetcher);
  const complianceSWR = useSWR<Compliance, any, any>([`/compliance/${name}`, 'GET'], axiosFetcher);
  const files = useOrgSWR<any[], any>([`/files`, 'GET'], axiosFetcher);

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

  const compliance = complianceSWR.data;

  useEffect(() => {
    if (compliance) {
      logBrowser(`Setting ${name} compliance manager status to activated`, 'info', { name, compliance });
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

          const statuses = countsDataSWR?.data?.statuses;
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
  }, [compliance, files, currentAIStatus, countsDataSWR, name]);

  useEffect(() => {
    logBrowser('Compliance Definition', 'info', {
      name,
      orgId,
      compliance,
      status,
      managementView,
      currentAIStatus: currentAIStatus.data,
      files: files.data,
      complianceSWR: complianceSWR.data,
    });
  }, [files, currentAIStatus, name, orgId, compliance, status, managementView, complianceSWR]);

  if (files.isLoading || countsDataSWR.isLoading || sectionGroups.isLoading || complianceSWR.isLoading) {
    return <Spinner />;
  }

  const term = get(compliance, 'metadata.term', undefined);
  const due_date = get(compliance, 'metadata.due_date', undefined);
  let termString = '';

  if (term) {
    termString = getTermString(term);
  }

  let imageURL = get(compliance, 'image_url', undefined);

  if (!isDefined(imageURL)) {
    imageURL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png';
  }

  const getActiveTabElement = (tab: string) => {
    switch (tab) {
      case 'Preview':
        return <ComplianceManagerPreview />;
      default:
        return <ComplianceManagerOverview />;
    }
  };

  const tabs: string[] = ['Overview'];

  if (ldFlags.showNewComplianceManagerPreviewCold713) {
    tabs.push('Preview');
  }

  return (
    <ColdComplianceManagerContext.Provider
      value={{
        data: {
          compliance: compliance,
          files: files,
          name: name || '',
          currentAIStatus: currentAIStatus?.data,
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
          <img className={'w-full h-full object-cover'} src={imageURL} alt={compliance?.name} />
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
              {tabs.map(tab => (
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
