import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { find, forOwn, get } from 'lodash';
import { ColdIcon, ColdLeftArrowIcon, ComplianceManagerOverview, ErrorFallback, Spinner } from '@coldpbc/components';
import React, { useContext, useEffect, useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import { format } from 'date-fns';
import { withErrorBoundary } from 'react-error-boundary';
import ColdMQTTContext from '../../../context/coldMQTTContext';
import { MQTTComplianceManagerPayload, OrgCompliance } from '@coldpbc/interfaces';
import useSWRSubscription from 'swr/subscription';
import useSWR from 'swr';
import { axiosFetcher, resolveNodeEnv } from '@coldpbc/fetchers';
import { getTermString } from '@coldpbc/lib';

// todo: test upload documents
// todo: test run against AI
// todo: handle user submission. need status data

const _ComplianceManager = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const navigate = useNavigate();
  const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);
  const [managementView, setManagementView] = useState<string>('Overview');
  const [status, setStatus] = useState<ComplianceManagerStatus>(ComplianceManagerStatus.notActivated);
  const [complianceCounts, setComplianceCounts] = useState<{
    [key: string]: {
      not_started: number;
      ai_answered: number;
      user_answered: number;
      bookmarked: number;
    };
  }>({});
  const { logBrowser } = useColdContext();

  const orgCompliances = useSWR<OrgCompliance[], any, any>(orgId ? [`/compliance_definitions/organizations/${orgId}`, 'GET'] : null, axiosFetcher);
  const files = useOrgSWR<any[], any>([`/files`, 'GET'], axiosFetcher);

  const topic = `ui/${resolveNodeEnv()}/${orgId}/${name}`;
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
    data: unknown | undefined;
    error: any;
  };

  const compliance = data?.compliance_definition;

  useEffect(() => {
    if (client?.current && connectionStatus) {
      publishMessage(
        `platform/${resolveNodeEnv()}/compliance/getComplianceSectionGroupList`,
        JSON.stringify({
          reply_to: topic,
          resource: 'complianceSectionGroupListByOrgIdCompNameKey',
          method: 'GET',
          compliance_set_name: name,
        }),
      );
    }
  }, [connectionStatus, name, publishMessage, client]);

  useEffect(() => {
    if (orgCompliances) {
      // check to see is the compliance is in the orgCompliances
      const orgCompliance = find(orgCompliances.data, { compliance_definition: { name } });
      if (orgCompliance) {
        setStatus(ComplianceManagerStatus.activated);
        if (files.data && files.data.length > 0) {
          setStatus(ComplianceManagerStatus.uploadedDocuments);
          if (currentAIStatus?.data) {
            setStatus(ComplianceManagerStatus.startedAi);
          } else {
            // check the compliance counts to see if the AI has been run
            let aiAnswered = 0;
            let userAnswered = 0;
            let totalQuestions = 0;
            forOwn(complianceCounts, (value, key) => {
              aiAnswered += value.ai_answered;
              userAnswered += value.user_answered;
              totalQuestions += value.not_started + value.ai_answered + value.user_answered + value.bookmarked;
            });
            // if the ai answers are greater than 0 then the AI has been run
            // but how do we tell difference between first ai run and subsequent ai runs
            if (aiAnswered > 0 && userAnswered === 0) {
              setStatus(ComplianceManagerStatus.completedAi);
            } else if (aiAnswered > 0 && userAnswered > 0) {
              setStatus(ComplianceManagerStatus.startedQuestions);
            }

            if (totalQuestions === userAnswered) {
              setStatus(ComplianceManagerStatus.completedQuestions);
            }
          }
        }
      }
    }
  }, [orgCompliances, files, currentAIStatus, complianceCounts]);

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
    currentAIStatus,
  });

  if (!data) {
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
        },
        status: status,
        setStatus: setStatus,
        complianceCounts: complianceCounts,
        setComplianceCounts: setComplianceCounts,
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
