import { JourneyOverviewCard, TemperatureCheckCard } from '../../molecules';
import {
  AppContent,
  CenterColumnContent,
  RightColumnContent,
  SubcategoryActionsOverviewCard,
} from '../../organisms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useEffect } from 'react';
import { mutate } from 'swr';
import { useSearchParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const _ActionsOverview = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const { user } = useAuth0();
  //
  // useEffect(() => {
  //   const reloadActions = async () => {
  //     await mutate([
  //       `/organizations/${user?.coldclimate_claims.org_id}/actions`,
  //       'GET',
  //     ]);
  //   };
  //   reloadActions();
  // }, [searchParams]);

  return (
    <AppContent title="Actions Overview">
      <CenterColumnContent>
        <SubcategoryActionsOverviewCard
          subcategory_key={'facilities'}
          category_key={'company_decarbonization'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'travel'}
          category_key={'company_decarbonization'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'operations'}
          category_key={'company_decarbonization'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'product'}
          category_key={'company_decarbonization'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'employee_footprint'}
          category_key={'employee_engagement'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'employee_activation'}
          category_key={'employee_engagement'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'internal_alignment'}
          category_key={'climate_leadership'}
        />
        <SubcategoryActionsOverviewCard
          subcategory_key={'community_impact'}
          category_key={'climate_leadership'}
        />
      </CenterColumnContent>
      <RightColumnContent>
        <TemperatureCheckCard
          cardTitle="Temperature Check"
          stats={['cold_score', 'actions_completed']}
          cornerGlow
        />
        <JourneyOverviewCard />
      </RightColumnContent>
    </AppContent>
  );
};

export const ActionsOverview = withErrorBoundary(_ActionsOverview, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in ActionsOverview: ', error);
  },
});
