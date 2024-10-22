import { ErrorFallback, ErrorPage, MainContent, Spinner, SustainabilityAttributeTab } from '@coldpbc/components';
import type { SustainabilityAttribute } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { useAuth0Wrapper, useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { get, has } from 'lodash';

const _SustainabilityPage = () => {
  const tabs = ['My Attributes', 'Other Attributes'];
  const [tabView, setTabView] = React.useState(tabs[0]);
  const { logBrowser } = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const sustainabilityAttributesQuery = useGraphQLSWR<{
    sustainabilityAttributes: SustainabilityAttribute[]
  }>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG' : null, {
    organizationId: orgId,
  });

  if (sustainabilityAttributesQuery.isLoading) {
    return (
      <MainContent title="Sustainability Attributes" className={'w-[calc(100%-100px)]'}>
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

  const sustainabilityAttributes: SustainabilityAttribute[] = get(sustainabilityAttributesQuery.data, 'data.sustainabilityAttributes', []).sort(
    (a, b) => a.name.localeCompare(b.name)
  );
  const myAttributes = sustainabilityAttributes.filter(attribute => (attribute.attributeAssurances?.length || 0) > 0);
  const otherAttributes = sustainabilityAttributes.filter(attribute => (attribute.attributeAssurances?.length || 0) === 0);

  return (
		<MainContent title="Sustainability Attributes" className={'w-[calc(100%-100px)]'}>
			<div className={'flex flex-col w-full h-full'}>
				<div className={'flex flex-row w-full justify-start relative'} data-testid={'sustainability-tabs'}>
          <div className={'absolute bottom-0 left-0 h-[2px] bg-gray-90 w-full'}></div>
          {tabs.map(tab => (
            <div
              className={`px-[16px] py-[8px] text-h5 cursor-pointer relative ` + (tabView === tab ? 'text-tc-primary' : 'text-tc-disabled')}
              onClick={() => setTabView(tab)}
              key={tab}>
              {`${tab} (${tab === 'My Attributes' ? myAttributes.length : otherAttributes.length})`}
              {tabView === tab && <div className={'absolute bottom-0 left-0 w-full h-[4px] bg-primary-300'}></div>}
            </div>
          ))}
				</div>
				<div>
					{tabView === 'My Attributes' ? (
						<SustainabilityAttributeTab sustainabilityAttributes={myAttributes} tab={'My Attributes'} />
					) : (
						<SustainabilityAttributeTab sustainabilityAttributes={otherAttributes} tab={'Other Attributes'} />
					)}
				</div>
			</div>
		</MainContent>
	);
};

export const SustainabilityPage = withErrorBoundary(_SustainabilityPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Sustainability: ', error);
  },
});
