import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { AppContent } from '../../organisms/appContent/appContent';
import { FootprintOverviewCard, FootprintOverviewVariants, JourneyOverviewCard } from '../../molecules';

export function Home() {
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
        </CenterColumnContent>
        <RightColumnContent />
      </AppContent>
    );
  }
  return null;
}
