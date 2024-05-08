import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { find } from 'lodash';
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
import { axiosFetcher } from '@coldpbc/fetchers';

const _ComplianceManager = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const { subscribeSWR, publishMessage, connectionStatus, client } = useContext(ColdMQTTContext);
  const navigate = useNavigate();
  const [managementView, setManagementView] = useState<string>('Overview');
  const [status, setStatus] = useState<ComplianceManagerStatus>(ComplianceManagerStatus.notActivated);

  const orgCompliances = useSWR<OrgCompliance[], any, any>(orgId ? [`/compliance_definitions/organizations/${orgId}`, 'GET'] : null, axiosFetcher);

  const { data, error } = useSWRSubscription(`ui/${import.meta.env.VITE_DD_ENV}/${orgId}/compliance/${name}`, subscribeSWR) as {
    data: MQTTComplianceManagerPayload | undefined;
    error: any;
  };

  useEffect(() => {
    if (client?.current && connectionStatus) {
      publishMessage(
        `platform/${import.meta.env.VITE_DD_ENV}/compliance/getComplianceSectionGroupList`,
        JSON.stringify({
          reply_to: `ui/${import.meta.env.VITE_DD_ENV}/${orgId}/compliance/${name}`,
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
      }
    }
  }, [orgCompliances]);

  // const compliances = getAllComplianceManagerMock();
  // const orgCompliances = getOrganizationComplianceManagerMock();
  // const orgCompliance = find(orgCompliances, compliance => compliance.compliance_definition.name === name);
  // const compliance = find(compliances, { name });
  console.log({
    // orgCompliances,
    // orgCompliance,
    // compliance,
    // topic: `platform/${import.meta.env.VITE_DD_ENV}/compliance/${orgId}/compliance_definition/${name}`,
    type: 'compliance definition',
    data,
    error,
  });

  if (!data) {
    return <Spinner />;
  }

  const { term, due_date } = data?.metadata as {
    term: string;
    due_date: string;
  };

  let termString = '';
  switch (term) {
    case 'annual':
      termString = 'Annual';
      break;
    case 'quarterly':
      termString = 'Quarterly';
      break;
    case '3_year_term':
      termString = '3 Year Term';
      break;
    default:
      termString = '';
  }

  const getActiveTabElement = (tab: string) => {
    switch (tab) {
      default:
        return <ComplianceManagerOverview />;
    }
  };
  const complianceDefinition = data;
  return (
    <ColdComplianceManagerContext.Provider
      value={{
        data: {
          complianceSet: undefined,
          orgComplianceSet: undefined,
          mqttComplianceSet: data,
          name: name || '',
        },
        status: status,
        setStatus: setStatus,
      }}>
      <div className={'flex flex-col w-full gap-[48px] justify-center relative'}>
        <div className={'absolute top-0 w-full h-[179px]'}>
          <img className={'w-full h-full object-cover'} src={data?.image_url} alt={complianceDefinition?.name} />
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
              <img className={'w-[120px] h-[120px] invert'} src={complianceDefinition?.logo_url} alt={complianceDefinition?.name} />
            </div>
            <div className={'flex flex-col justify-start'}>
              <div className={'text-[40px] font-bold leading-[60px] text-tc-primary'}>{complianceDefinition?.title}</div>
              <div className={'flex flex-row gap-[32px]'}>
                {due_date && (
                  <div className={'flex flex-row gap-[4px] items-center'}>
                    <ColdIcon name={IconNames.ColdCalendarDaysIcon} className={'w-[24px] h-[24px]'} />
                    <div className={'text-body text-tc-secondary'}>{new Date(due_date).getFullYear()} Compliance Set</div>
                  </div>
                )}
                {term && (
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
