import {ErrorFallback, ErrorPage, MainContent, Spinner, SustainabilityAttributeTab, Tabs} from '@coldpbc/components';
import type { SustainabilityAttribute, SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { processSustainabilityAttributeDataFromGraphQL } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { useAuth0Wrapper, useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { get } from 'lodash';
import { EntityLevel } from '@coldpbc/enums';
import { useFlags } from 'launchdarkly-react-client-sdk';

const _SustainabilityPage = () => {
  const ldFlags = useFlags();
  const { logBrowser } = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const sustainabilityAttributesQuery = useGraphQLSWR<{
    sustainabilityAttributes: SustainabilityAttributeGraphQL[]
  }>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG' : null, {
    organizationId: orgId,
  });

  const { myAttributes, otherAttributes } = React.useMemo(() => {
    const sustainabilityAttributesGraphQL: SustainabilityAttributeGraphQL[] = get(sustainabilityAttributesQuery.data, 'data.sustainabilityAttributes', [])
    const sustainabilityAttributes: SustainabilityAttribute[] = processSustainabilityAttributeDataFromGraphQL(sustainabilityAttributesGraphQL)
      .filter(attribute => attribute.level !== EntityLevel.ORGANIZATION)
      .sort((a, b) => a.name.localeCompare(b.name));
    const myAttributes = sustainabilityAttributes.filter(attribute => (attribute.attributeAssurances?.length || 0) > 0);
    const otherAttributes = sustainabilityAttributes.filter(attribute => (attribute.attributeAssurances?.length || 0) === 0);

    return { myAttributes, otherAttributes };
  }, [sustainabilityAttributesQuery.data]);

  if (sustainabilityAttributesQuery.isLoading) {
    return (
      <MainContent title={ldFlags.showNewSidebarCold1354 ? 'Sustainability Claims' : 'Sustainability Attributes'} className={'w-[calc(100%-100px)]'}>
        <Spinner />
      </MainContent>
    );
  };

  const error = sustainabilityAttributesQuery.error || get(sustainabilityAttributesQuery.data, 'errors');
  if (error) {
    logBrowser('Error fetching sustainability attribute data', 'error', {}, error);
    return (
      <ErrorPage
        error={error}
        showLogout={false}
      />
    )
  }

  return (
		<MainContent title={ldFlags.showNewSidebarCold1354 ? 'Sustainability Claims' : 'Sustainability Attributes'} className={'w-[calc(100%-100px)]'}>
      <Tabs
        tabs={[
          {
            label: `My Attributes (${myAttributes.length})`,
            content: <SustainabilityAttributeTab sustainabilityAttributes={myAttributes} tab={'My Attributes'} />
          }, {
            label: `Other Attributes (${otherAttributes.length})`,
            content: <SustainabilityAttributeTab sustainabilityAttributes={otherAttributes} tab={'Other Attributes'} />
          }
        ]}
        className={'flex flex-col w-full h-full gap-[0px]'}
        data-testid={'sustainability-tabs'}
        />
		</MainContent>
	);
};

export const SustainabilityPage = withErrorBoundary(_SustainabilityPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Sustainability: ', error);
  },
});
