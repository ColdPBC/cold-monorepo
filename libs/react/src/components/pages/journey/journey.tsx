import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { Card, JourneyOverviewCard } from '../../molecules';
import { AppContent } from '../../organisms/appContent/appContent';
import { DismissableInfoCard } from '../../molecules/dismissableInfoCard';
import { JourneyDetailView } from '../../molecules/journeyDetailView';
import { TemperatureCheckCard } from '../../molecules/temperatureCheckCard';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useOrgSWR } from '@coldpbc/hooks';

const PERIOD = 2022;

function _Journey() {
  const { data, error, isLoading } = useOrgSWR<any>(
    ['/categories/', 'GET'],
    axiosFetcher,
  );

  const isEmptyData =
    (data?.definition &&
      Object.keys(data.definition.categories).length === 0) ||
    data?.response?.status === 404;

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
      <AppContent title="Climate Journey">
        <CenterColumnContent>
          {!isEmptyData ? (
            <Card>
              <JourneyDetailView />
            </Card>
          ) : (
            <>
              <DismissableInfoCard
                text="Your Cold Score is a measure of your company's progress towards climate leadership. The higher your score, the more progress you've made!"
                onDismiss={() => {}}
                dismissKey="journey-page"
              />
              <JourneyOverviewCard omitCta={true} />
            </>
          )}
        </CenterColumnContent>
        <RightColumnContent>
          <TemperatureCheckCard
            cardTitle="Temperature Check"
            stats={['cold_score', 'footprint']}
          />
        </RightColumnContent>
      </AppContent>
    );
  }

  return null;
}

export const Journey = withErrorBoundary(_Journey, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in Journey: ', error);
  },
});
