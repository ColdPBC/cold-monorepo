import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { AppContent } from '../../organisms/appContent/appContent';
import { JourneyDetailView } from '../../molecules/journeyDetailView';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { ColdAssessmentsProvider } from '@coldpbc/providers';


function _Journey() {

  return (
      <AppContent title="Assessments">
        <ColdAssessmentsProvider>
          <CenterColumnContent>
            <JourneyDetailView />
          </CenterColumnContent>
          <RightColumnContent>
          </RightColumnContent>
        </ColdAssessmentsProvider>
      </AppContent>
  );
}

export const Journey = withErrorBoundary(_Journey, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Journey: ', error);
  },
});
