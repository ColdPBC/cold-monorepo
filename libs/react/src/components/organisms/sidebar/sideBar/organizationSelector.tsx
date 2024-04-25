import { withErrorBoundary } from 'react-error-boundary';
import { ColdIcon, ErrorFallback, Spinner } from '@coldpbc/components';
import { useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType, IconNames } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Dropdown } from 'flowbite-react';
import { find } from 'lodash';

const _OrganizationSelector = ({ sidebarExpanded }: { sidebarExpanded?: boolean }) => {
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

  if (sidebarExpanded) {
    return (
      <Dropdown
        inline={true}
        label={
          <span className={'w-full p-4 text-tc-primary text-start text-xs flex items-center border border-bgc-accent rounded-lg truncate'}>
            {selectedOrg.display_name} <ChevronDownIcon className="w-[18px] ml-2" />
          </span>
        }
        arrowIcon={false}
        theme={flowbiteThemeOverride.dropdown}
        className={'w-[175px] h-fit max-h-[200px] overflow-y-auto truncate'}>
        {data.map((org: any) => (
          <Dropdown.Item
            key={org.id}
            onClick={() => {
              onOrgSelect(org);
            }}
            theme={flowbiteThemeOverride.dropdown.floating.item}
            className={'text-start text-xs truncate'}>
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
