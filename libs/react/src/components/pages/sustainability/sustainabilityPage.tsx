import { ErrorFallback, MainContent, SustainabilityAttributeTab } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const MY_ATTRIBUTES_EMPTY_STATE_PROPS = {
  header: (
    <p>
      Welcome! To get started with sustainability attribute tracking, upload documents for any certifications, standards, or statements on the{' '}
      <a href={'/documents'} className="hover:underline">
        Documents Tab
      </a>
    </p>
  )
};
const OTHER_ATTRIBUTES_EMPTY_STATE_PROPS = {
  header: "Wow! You’re already tracking all of Cold’s current sustainability attributes.",
  body: (
    <p>
      If you would like to add a new Sustainability Attribute to Cold contact our{' '}
      <a href="mailto:support@coldclimate.com" className="hover:underline">
        support@coldclimate.com
      </a>{' '}
      to request.
    </p>
  )
}

const _SustainabilityPage = () => {
  const [tabView, setTabView] = React.useState('My Attributes');
  const tabs = ['My Attributes', 'Other Attributes'];

  return (
    <MainContent title="Sustainability Attributes" className={'w-[calc(100%-100px)]'}>
			<div className={'flex flex-col w-full h-full'}>
				<div className={'flex flex-row w-full justify-start relative'} data-testid={'sustainability-tabs'}>
					{tabs.map(tab => (
						<div
							className={`px-[16px] py-[8px] text-h5 cursor-pointer relative ` + (tabView === tab ? 'text-tc-primary' : 'text-tc-disabled')}
							onClick={() => setTabView(tab)}
							key={tab}>
							{tab}
							{tabView === tab && <div className={'absolute bottom-0 left-0 w-full h-[4px] bg-primary-300'}></div>}
						</div>
					))}
				</div>
				<div className={'flex-grow flex items-center justify-center'}>
          {tabView === 'My Attributes' ? (
            <SustainabilityAttributeTab
              emptyStateProps={MY_ATTRIBUTES_EMPTY_STATE_PROPS}
            />
          ) : (
            <SustainabilityAttributeTab
              emptyStateProps={OTHER_ATTRIBUTES_EMPTY_STATE_PROPS}
            />
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
