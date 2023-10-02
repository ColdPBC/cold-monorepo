import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { AppContent } from '../../organisms/appContent/appContent';
import { FootprintOverviewCard, FootprintOverviewVariants, JourneyOverviewCard, NewsCard } from '../../molecules';
import { TemperatureCheckCard } from '../../molecules/temperatureCheckCard';
import { useFlags } from 'launchdarkly-react-client-sdk';

export function Home() {
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
          <FootprintOverviewCard chartVariant={FootprintOverviewVariants.horizontal} />
          <JourneyOverviewCard />
          {ldFlags.showNewsModuleCOLD310 && <NewsCard />}
        </CenterColumnContent>
        <RightColumnContent>
          <TemperatureCheckCard
              cardTitle="Temperature Check"
              stats={['cold_score','footprint','emissions_avoided','actions_completed']}
          />
        </RightColumnContent>
      </AppContent>
    );
  }
  return null;
}
