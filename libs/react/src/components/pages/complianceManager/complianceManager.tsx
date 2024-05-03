import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { find } from 'lodash';
import { ColdCalendarDaysIcon, ColdCalendarEventIcon, ColdClockIcon, ColdLeftArrowIcon, ComplianceManagerOverview } from '@coldpbc/components';
import { useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { getAllComplianceManagerMock, getOrganizationComplianceManagerMock } from '@coldpbc/mocks';
import { format } from 'date-fns';

export const ComplianceManager = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const [managementView, setManagementView] = useState<string>('Overview');
  const [status, setStatus] = useState<ComplianceManagerStatus>(ComplianceManagerStatus.notActivated);

  // const getComplianceURL = () => {
  //   if (orgId) {
  //     return [`/compliance_definitions/organizations/${orgId}`, 'GET'];
  //   } else {
  //     return null;
  //   }
  // };
  //
  // const { data, isLoading, error } = useSWR<OrgCompliance[], any, any>(getComplianceURL(), axiosFetcher);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  //
  // if (error) {
  //   return <div>Error</div>;
  // }
  // get the

  const compliances = getAllComplianceManagerMock();
  const orgCompliances = getOrganizationComplianceManagerMock();
  const orgCompliance = find(orgCompliances, compliance => compliance.compliance_definition.name === name);
  const compliance = orgCompliance?.compliance_definition;

  if (!compliance) {
    return <div>Not Found</div>;
  }

  const { due_date, term } = compliance.metadata as {
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

  return (
    <ColdComplianceManagerContext.Provider
      value={{
        data: {
          complianceSet: compliance,
          orgComplianceSet: orgCompliance,
        },
        status: status,
        setStatus: setStatus,
      }}>
      <div className={'flex flex-col w-full gap-[48px] justify-center relative'}>
        <div className={'absolute top-0 w-full h-[179px]'}>
          <img className={'w-full h-full object-cover'} src={compliance.image_url} alt={compliance.name} />
        </div>
        <div
          className={'absolute top-0 w-full px-[16px] py-[8px] text-button text-tc-primary flex flex-row gap-[1px] items-center bg-[#1f202e80] cursor-pointer justify-start'}
          onClick={() => navigate('/compliance')}>
          <ColdLeftArrowIcon className={'w-[24px] h-[24px]'} />
          <div>Compliance Sets</div>
        </div>
        <div className={'w-full h-[281px] flex-col items-end justify-center relative'} data-testid={'compliance-manager-header'}>
          <div className={'flex flex-row gap-[10px] px-[70px] items-end h-full absolute bottom-0 w-full'}>
            <div className={'h-[194px] w-[194px] rounded-full bg-gray-50 flex items-center justify-center'}>
              <img className={'w-[120px] h-[120px] invert'} src={compliance.logo_url} alt={compliance.name} />
            </div>
            <div className={'flex flex-col justify-start'}>
              <div className={'text-[40px] font-bold leading-[60px] text-tc-primary'}>{compliance.title}</div>
              <div className={'flex flex-row gap-[32px]'}>
                {due_date && (
                  <div className={'flex flex-row gap-[4px]'}>
                    <ColdCalendarDaysIcon className={'w-[24px] h-[24px]'} />
                    <div className={'text-body text-tc-secondary'}>{new Date(due_date).getFullYear()} Compliance Set</div>
                  </div>
                )}
                {term && (
                  <div className={'flex flex-row gap-[4px]'}>
                    <ColdClockIcon className={'w-[24px] h-[24px]'} />
                    <div className={'text-body text-tc-secondary'}>{termString}</div>
                  </div>
                )}
                {due_date ? (
                  <div className={'flex flex-row gap-[4px]'}>
                    <ColdCalendarEventIcon className={'w-[24px] h-[24px]'} />
                    <div className={'text-body text-tc-secondary'}>{format(new Date(due_date), 'MMMM d, yyyy')}</div>
                  </div>
                ) : (
                  <div className={'flex flex-row gap-[4px]'}>
                    <ColdCalendarEventIcon className={'w-[24px] h-[24px]'} />
                    <div className={'text-body'}>Ongoing</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col px-[64px] w-full gap-[48px] justify-center max-w-[1400px]'}>
          <div className={'flex flex-col w-full justify-start relative'} data-testid={'compliance-manager-tabs'}>
            <div className={'absolute bottom-0 left-0 h-[2px] bg-gray-90 w-full'}></div>
            <div className={'flex flex-row w-full justify-start'} data-testid={'compliance-manager-tabs'}>
              {['Overview', 'Documents', 'Preview'].map(tab => (
                <div
                  className={`px-[16px] py-[8px] text-h5 cursor-pointer relative ` + (managementView === tab ? 'text-tc-primary' : 'text-tc-disabled')}
                  onClick={() => setManagementView(tab)}>
                  {tab}
                  {managementView === tab && <div className={'absolute bottom-0 left-0 w-full h-[4px] bg-primary-300'}></div>}
                </div>
              ))}
            </div>
          </div>
          {getActiveTabElement(managementView)}
        </div>
      </div>
    </ColdComplianceManagerContext.Provider>
  );
};
