import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppContent, CenterColumnContent, RightColumnContent, SubcategoryActionDetailsCard, SubcategoryFootprintCard } from '@coldpbc/components';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Card, SubcategoryJourneyPreview } from '../../molecules';
import { ActionPayload } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useEffect } from 'react';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';

const _SubcategoryActionsList = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { logError } = useColdContext();
	const navigate = useNavigate();

	const { name } = useParams();

	const { data } = useOrgSWR<any>(['/categories', 'GET'], axiosFetcher);

	const { data: actions, error: actionsError, isLoading: actionsIsLoading, mutate } = useOrgSWR<ActionPayload[], any>([`/actions`, 'GET'], axiosFetcher);

	actions?.sort((a, b) => {
		return a.id.localeCompare(b.id);
	});

	useEffect(() => {
		const reloadActions = async () => {
			await mutate();
		};
		reloadActions();
	}, [searchParams]);

	if (actionsError) {
		logError(actionsError, ErrorType.SWRError);
		return <div></div>;
	}

	if (!name) return null;

	const category = Object.keys(data?.definition?.categories ?? {}).find((category: any) => data?.definition?.categories[category].subcategories[name]);

	if (!category) return null;

	const subcategoryData = data?.definition?.categories[category]?.subcategories[name];

	if (!subcategoryData) {
		return null;
	}

	const subcategoryName = subcategoryData.subcategory_name;

	if (actionsIsLoading) {
		return <div>Spinner</div>;
	}

	if (actionsError) {
		console.error(actionsError);
		return <div></div>;
	}

	return (
		<AppContent title={subcategoryName}>
			<CenterColumnContent>
				{subcategoryData?.subcategory_description && (
					<Card glow data-testid={'subcategory-description'}>
						<div className={'text-body text-tc-primary'}>{subcategoryData?.subcategory_description}</div>
					</Card>
				)}
				{actions
					?.filter(actionPayload => actionPayload.action.subcategory === name)
					.map(actionPayload => {
						return (
							<div key={actionPayload.id} data-testid={'subcategory-action-detail-card'}>
								<SubcategoryActionDetailsCard actionPayload={actionPayload} />
							</div>
						);
					})}
			</CenterColumnContent>
		</AppContent>
	);
};

export const SubcategoryActionsList = withErrorBoundary(_SubcategoryActionsList, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SubcategoryActionsList: ', error);
	},
});
