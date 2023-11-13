import { withErrorBoundary } from 'react-error-boundary';
import { BaseButton, ErrorFallback, Input, Spinner } from '@coldpbc/components';
import { useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ButtonTypes, ErrorType, InputTypes } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import { InputOption } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Dropdown } from 'flowbite-react';
import { find } from 'lodash';

const _OrganizationSelector = () => {
  const { data, error, isLoading } = useSWR<any, any>(
    ['/organizations', 'GET'],
    axiosFetcher,
  );
  const { logError, setImpersonatingOrg, impersonatingOrg } = useColdContext();
  const unselectedOrg = {
    id: '0',
    name: 'unselected',
    display_name: 'Select Org',
  };
  const initialValue = impersonatingOrg ? impersonatingOrg : unselectedOrg;
  const [selectedOrg, setSelectedOrg] = useState<any>(initialValue);

  const onOrgSelect = (org: any) => {
    setSelectedOrg(org);
    if (org.name === 'unselected') {
      setImpersonatingOrg(undefined);
    } else {
      setImpersonatingOrg(org);
    }
  };

  useEffect(() => {
    // add unselected org to the top of the list if it's not there
    if (data && !find(data, (org) => org.name === unselectedOrg.name)) {
      data.unshift(unselectedOrg);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    logError(error, ErrorType.SWRError);
    return null;
  }

  console.log('data', data);

  return (
    <div className={'w-full p-4'}>
      <Dropdown
        inline={true}
        label={
          <span
            className={
              'w-full p-4 text-tc-primary text-start flex items-center border border-bgc-accent rounded-lg'
            }
          >
            {selectedOrg.display_name}{' '}
            <ChevronDownIcon className="w-[18px] ml-2" />
          </span>
        }
        arrowIcon={false}
        theme={flowbiteThemeOverride.dropdown}
        className={'h-fit max-h-[200px] overflow-y-auto'}
      >
        {data.map((org: any) => (
          <Dropdown.Item
            key={org.id}
            onClick={() => {
              onOrgSelect(org);
            }}
            theme={flowbiteThemeOverride.dropdown.floating.item}
            className={'text-start'}
          >
            {org.display_name}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export const OrganizationSelector = withErrorBoundary(_OrganizationSelector, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
});
