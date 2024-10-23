import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FootprintOverviewCard, NewsCard, NextActionsCard } from '../../molecules';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { AppContent, CenterColumnContent, EmissionsDonutChartVariants, ErrorFallback, RightColumnContent, Spinner } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { EmissionsOverviewCard, NextSteps } from '../../organisms';
import { useColdContext } from '@coldpbc/hooks';

function _Home() {
	const { logBrowser } = useColdContext();
	const ldFlags = useFlags();
	const auth0 = useAuth0();

	if (auth0.isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (auth0.user) {
		logBrowser('Home page loaded', 'info', { user: auth0.user, ldFlags: ldFlags });

		return (
			<AppContent title={'Welcome, ' + auth0.user?.given_name}>
				<CenterColumnContent>
					{ldFlags.showNextStepsCard && <NextSteps />}
					{ldFlags.showNewCarbonFootprintModuleCold634 ? <EmissionsOverviewCard /> : <FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.horizontal} />}
					{ldFlags.showNewsModuleCold310 && <NewsCard />}
				</CenterColumnContent>
				<RightColumnContent>{ldFlags.showActions261 && <NextActionsCard />}</RightColumnContent>
			</AppContent>
		);
	}
	return null;
}

export const Home = withErrorBoundary(_Home, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in Home: ', error);
	},
});
