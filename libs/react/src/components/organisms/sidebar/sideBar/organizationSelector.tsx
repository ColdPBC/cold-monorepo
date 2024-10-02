import { withErrorBoundary } from 'react-error-boundary';
import { ColdIcon, ErrorFallback, Spinner } from '@coldpbc/components';
import { useColdContext } from '@coldpbc/hooks';
import type { Organization } from '@coldpbc/context';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType, IconNames } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { find, parseInt } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Dropdown } from 'flowbite-react';
import { ComboBox } from '@coldpbc/components';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { InputOption } from '@coldpbc/interfaces';

const orgToInputOption = (org: Organization) => {
  return {
    id: parseInt(org.id),
    name: org.display_name,
    value: org.id
  };
}

const _OrganizationSelector = ({ sidebarExpanded }: { sidebarExpanded?: boolean }) => {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR<any, any, any>(['/organizations', 'GET'], axiosFetcher);
  const { logError, setImpersonatingOrg, impersonatingOrg, logBrowser } = useColdContext();
  const unselectedOrg: Organization = {
    id: '-1',
    name: 'unselected',
    display_name: 'Select Org',
  };

  const initialOrg: Organization = impersonatingOrg || unselectedOrg;
  const [selectedOrg, setSelectedOrg] = useState<InputOption>(orgToInputOption(initialOrg));

  const onOrgSelect = (selectedOption: InputOption) => {
    const org: Organization | undefined = find(data, org => org.id === selectedOption.value);
    if(org) {
      logBrowser(`New impersonating organization selected: ${org.display_name}`, 'info', { org: org });
      navigate('/');
      setSelectedOrg(selectedOption);
      setImpersonatingOrg(org);
    } else {
      setSelectedOrg(orgToInputOption(unselectedOrg));
      setImpersonatingOrg(undefined);
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
    const organizationOptions: InputOption[] = data.map((org: Organization, index: number) => ({
      id: index,
      name: org.display_name,
      value: org.id,
    }));

    return (
      <ComboBox
        options={organizationOptions}
        name={'selectOrg'}
        value={selectedOrg}
        onChange={onOrgSelect}
        dropdownDirection='up'
      />
    );
  } else {
    return <ColdIcon name={IconNames.ColdSwitchIcon} color={'white'} />;
  }
};

export const OrganizationSelector = withErrorBoundary(_OrganizationSelector, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
