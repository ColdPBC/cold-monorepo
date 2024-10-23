import { ActionPayload } from '@coldpbc/interfaces';
import { ActionItem, Card } from '@coldpbc/components';
import { ActionItemVariants, ErrorType } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useOrgSWR } from '../../../hooks/useOrgSWR';
import { useColdContext } from '@coldpbc/hooks';

export interface SubcategoryActionsOverviewCardProps {
	subcategory_key: string;
	category_key: string;
}

const _SubcategoryActionsOverviewCard = ({ subcategory_key, category_key }: SubcategoryActionsOverviewCardProps) => {
	const { data, error } = useOrgSWR<ActionPayload[], any>([`/actions`, 'GET'], axiosFetcher);

	const { data: categoryData, error: categoryError } = useOrgSWR<any>(['/categories', 'GET'], axiosFetcher);

	const subcategoryName = categoryData?.definition.categories[category_key].subcategories[subcategory_key]?.subcategory_name;

	const actions = data?.filter(actionPayload => actionPayload.action.subcategory === subcategory_key) ?? [];

	const { logError, logBrowser } = useColdContext();

	if (error || categoryError) {
		if (error) {
			logBrowser('Error loading actions data', 'error', { ...error }, error);
			logError(error, ErrorType.SWRError);
		}
		if (categoryError) {
			logBrowser('Error loading category data', 'error', { ...categoryError }, categoryError);
			logError(categoryError, ErrorType.SWRError);
		}
		return null;
	}

	if (!actions.length) {
		return null;
	}

	logBrowser('Actions data loaded', 'info', { actions, categoryData, subcategoryName });

	return (
		<Card className={'w-[666px]'} glow={true} data-testid={'subcategory-actions-overview-card'}>
			<div className={'text-tc-primary space-y-[16px]'}>
				<div className={'text-h3'}>{subcategoryName}</div>
				{actions.map(action => {
					return (
						<div key={action.id}>
							<ActionItem
								actionPayload={action}
								variant={ActionItemVariants.wide}
								showProgress={action.action.ready_to_execute && action.action.dependent_surveys.every(survey => survey.submitted)}
								data-testid={`subcategory-action-item-${action.id}`}
							/>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export const SubcategoryActionsOverviewCard = withErrorBoundary(_SubcategoryActionsOverviewCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SubcategoryActionsOverviewCard: ', error);
	},
});
