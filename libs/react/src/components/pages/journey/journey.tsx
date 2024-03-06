import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Card, JourneyOverviewCard } from '../../molecules';
import { AppContent } from '../../organisms/appContent/appContent';
import { DismissableInfoCard } from '../../molecules/dismissableInfoCard';
import { JourneyDetailView } from '../../molecules/journeyDetailView';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import { ColdAssessmentsProvider } from '@coldpbc/providers';


const PERIOD = 2022;

function _Journey() {
  const { logError } = useColdContext();
  const { data, error, isLoading } = useOrgSWR<any>(
    ['/categories/', 'GET'],
    axiosFetcher,
  );

  const isEmptyData =
    true;

  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error || auth0.error) {
    if (error) logError(error, ErrorType.SWRError);
    if (auth0.error) logError(auth0.error, ErrorType.Auth0Error);
    return null;
  }

  if (auth0.user) {
    return (
      <ColdAssessmentsProvider>
        <AppContent title="Assessments">
          <CenterColumnContent>
            {!isEmptyData ? (
              <Card>
                <JourneyDetailView />
              </Card>
            ) : (
              <>
                <DismissableInfoCard
                  text="Assessments show how much progress you've made towards a particular compliance set. Higher scores mean you're closer to doing everything possible for this compliance set."
                  onDismiss={() => {}}
                  dismissKey="journey-page"
                />
                <JourneyOverviewCard omitCta={true} />
              </>
            )}
          </CenterColumnContent>
          <RightColumnContent>
          </RightColumnContent>
        </AppContent>
      </ColdAssessmentsProvider>

    );
  }

  return null;
}

export const Journey = withErrorBoundary(_Journey, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Journey: ', error);
  },
});
