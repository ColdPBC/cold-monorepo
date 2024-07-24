import { withErrorBoundary } from 'react-error-boundary';
import { ColdIcon, ErrorFallback, Spinner } from '@coldpbc/components';
import { useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType, IconNames } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { find } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Dropdown } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const _OrganizationSelector = ({ sidebarExpanded }: { sidebarExpanded?: boolean }) => {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR<any, any, any>(['/organizations', 'GET'], axiosFetcher);
  const { logError, setImpersonatingOrg, impersonatingOrg, logBrowser } = useColdContext();
  const unselectedOrg = {
    id: '0',
    name: 'unselected',
    display_name: 'Select Org',
  };
  const initialValue = impersonatingOrg ? impersonatingOrg : unselectedOrg;
  const [selectedOrg, setSelectedOrg] = useState<any>(initialValue);

  const onOrgSelect = (org: any) => {
    logBrowser(`New impersonating organization selected: ${org.display_name}`, 'info', { org: org });
    navigate('/');
    setSelectedOrg(org);
    if (org.name === 'unselected') {
      setImpersonatingOrg(undefined);
    } else {
      setImpersonatingOrg(org);
    }
  };

  useEffect(() => {
    if (data && !find(data, org => org.name === unselectedOrg.name)) {
      data.unshift(unselectedOrg);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={'w-[48px] h-[48px]'}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    logBrowser('Error loading organizations data', 'error', { ...error }, error);
    logError(error, ErrorType.SWRError);
    return null;
  }

  logBrowser('Organizations data for organization selector loaded', 'info', { data, selectedOrg });

  if (sidebarExpanded || !ldFlags.showNewNavigationCold698) {
    return (
      <Dropdown
        inline={true}
        label={
          <span className={'w-full p-4 flex flex-row justify-between items-center border border-bgc-accent rounded-lg'}>
            <div className={'w-auto text-tc-primary text-start text-xs truncate'}>{selectedOrg.display_name}</div>
            <ChevronDownIcon className="w-[18px] ml-2 text-tc-primary" />
          </span>
        }
        arrowIcon={false}
        theme={flowbiteThemeOverride.dropdown}
        className={'h-fit max-h-[200px] overflow-y-auto scrollbar-hide overflow-x-visible text-ellipsis transition-none duration-0'}>
        {data
          .sort((a: any, b: any) => a.display_name.localeCompare(b.display_name))
          .map((org: any) => (
            <Dropdown.Item
              key={org.id}
              onClick={() => {
                onOrgSelect(org);
              }}
              theme={flowbiteThemeOverride.dropdown.floating.item}
              className={'text-start text-xs text-ellipsis'}>
              {org.display_name}
            </Dropdown.Item>
          ))}
      </Dropdown>
    );
  } else {
    return <ColdIcon name={IconNames.ColdSwitchIcon} color={'white'} />;
  }
};

export const OrganizationSelector = withErrorBoundary(_OrganizationSelector, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
