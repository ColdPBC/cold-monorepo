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
import { ComboBox } from '@coldpbc/components';
import { useNavigate } from 'react-router-dom';
import { InputOption } from '@coldpbc/interfaces';

const orgToInputOption = (org: Organization | undefined) => {
  if (org) {
    return {
      id: parseInt(org.id),
      name: org.display_name,
      value: org.id
    };
  } else {
    return null;
  }
}

const _OrganizationSelector = ({ sidebarExpanded }: { sidebarExpanded?: boolean }) => {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR<any, any, any>(['/organizations', 'GET'], axiosFetcher);
  const { logError, setImpersonatingOrg, impersonatingOrg, logBrowser } = useColdContext();

  // Default to the impersonating org if already set
  const [selectedOption, setSelectedOption] = useState<InputOption | null>(orgToInputOption(impersonatingOrg));

  const onOrgSelect = (selectedOption: InputOption) => {
    const org: Organization | undefined = find(data, org => org.id === selectedOption.value);
    if(org) {
      logBrowser(`New impersonating organization selected: ${org.display_name}`, 'info', { org: org });
      navigate('/');
      setSelectedOption(selectedOption);
      setImpersonatingOrg(org);
    } else {
      setSelectedOption(null);
      setImpersonatingOrg(undefined);
    }
  };

  // Set the org to Cold Climate if there's no impersonating org
  useEffect(() => {
    if (data && !impersonatingOrg) {
      const coldClimateOrg = find(data, org => org.display_name === 'Cold Climate')
      setSelectedOption(orgToInputOption(coldClimateOrg));
    }
  }, [data, impersonatingOrg]);

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

  logBrowser('Organizations data for organization selector loaded', 'info', { data, selectedOption });

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
        value={selectedOption || { id: -1, name: 'Cold Climate', value: '-1'}} // selectedOrg can technically be null but shouldn't be once data is available
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
