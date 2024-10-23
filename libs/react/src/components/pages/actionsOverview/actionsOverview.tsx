import { TemperatureCheckCard } from '../../molecules';
import { AppContent, CenterColumnContent, RightColumnContent, SubcategoryActionsOverviewCard } from '../../organisms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

const _ActionsOverview = () => {
	return (
		<AppContent title="Actions Overview">
			<CenterColumnContent>
				<SubcategoryActionsOverviewCard subcategory_key={'facilities'} category_key={'company_decarbonization'} />
				<SubcategoryActionsOverviewCard subcategory_key={'travel'} category_key={'company_decarbonization'} />
				<SubcategoryActionsOverviewCard subcategory_key={'operations'} category_key={'company_decarbonization'} />
				<SubcategoryActionsOverviewCard subcategory_key={'product'} category_key={'company_decarbonization'} />
				<SubcategoryActionsOverviewCard subcategory_key={'employee_footprint'} category_key={'employee_engagement'} />
				<SubcategoryActionsOverviewCard subcategory_key={'employee_activation'} category_key={'employee_engagement'} />
				<SubcategoryActionsOverviewCard subcategory_key={'internal_alignment'} category_key={'climate_leadership'} />
				<SubcategoryActionsOverviewCard subcategory_key={'community_impact'} category_key={'climate_leadership'} />
			</CenterColumnContent>
			<RightColumnContent>
				<TemperatureCheckCard cardTitle="Temperature Check" stats={['cold_score', 'actions_completed']} cornerGlow />
			</RightColumnContent>
		</AppContent>
	);
};

export const ActionsOverview = withErrorBoundary(_ActionsOverview, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ActionsOverview: ', error);
	},
});
