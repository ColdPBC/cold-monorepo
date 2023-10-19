import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { AppContent } from '../../organisms/appContent/appContent';
import {
  FootprintOverviewCard,
  JourneyOverviewCard,
  NewsCard,
  NextActionsCard,
} from '../../molecules';
import { TemperatureCheckCard } from '../../molecules/temperatureCheckCard';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { EmissionsDonutChartVariants } from '../../atoms/emissionsDonutChart/emissionsDonutChart';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

function _Home() {
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
    return (
      <AppContent title={'Welcome, ' + auth0.user?.given_name}>
        <CenterColumnContent>
          <FootprintOverviewCard
            chartVariant={EmissionsDonutChartVariants.horizontal}
          />
          <JourneyOverviewCard />
          {ldFlags.showNewsModuleCold310 && <NewsCard />}
        </CenterColumnContent>
        <RightColumnContent>
          <TemperatureCheckCard
            cardTitle="Temperature Check"
            stats={[
              'cold_score',
              'footprint',
              'emissions_avoided',
              'actions_completed',
            ]}
          />
          {ldFlags.showActions261 && <NextActionsCard />}
        </RightColumnContent>
      </AppContent>
    );
  }
  return null;
}

export const Home = withErrorBoundary(_Home, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in Home: ', error);
  },
});
