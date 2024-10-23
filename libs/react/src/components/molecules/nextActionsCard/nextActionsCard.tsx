import { useAuth0 } from '@auth0/auth0-react';
import { ActionItemVariants, ErrorType } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ActionPayload } from '@coldpbc/interfaces';
import { useNavigate } from 'react-router-dom';
import { ActionItem } from '../actionItem';
import { Card } from '../card';
import { DateTime } from 'luxon';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';

const _NextActionsCard = () => {
	const navigate = useNavigate();

	const { user } = useAuth0();

	const { data, error } = useOrgSWR<ActionPayload[], any>([`/actions`, 'GET'], axiosFetcher);

	const { logError } = useColdContext();

	if (error) {
		logError(error, ErrorType.SWRError);
		return null;
	}

	const actions = data
		?.filter(actionPayload => actionPayload.action.steps.some(step => !step.complete))
		.slice(0, 3)
		.sort((a, b) => {
			// sort by target date first
			let targetDateDiff: number | null = null;
			if (a.action.due_date && b.action.due_date) {
				targetDateDiff = DateTime.fromISO(a.action.due_date).diff(DateTime.fromISO(b.action.due_date)).toMillis();
			}
			// check if both have a target date and that diff is greater than 0
			if (targetDateDiff) {
				return targetDateDiff;
			}
			// sort by updated_date, which one was more recently updated
			else {
				return DateTime.fromISO(b.updated_at).diff(DateTime.fromISO(a.updated_at)).toMillis();
			}
		});

	if (actions && actions.length > 0) {
		return (
			<Card glow title="Your Next Actions" ctas={[{ text: 'Learn More', action: () => navigate('/actions') }]} data-testid={'next-actions-card'}>
				{actions?.map((action, index) => (
					<div key={`action_item_${index}`} className={'w-full'}>
						<ActionItem
							actionPayload={action}
							variant={ActionItemVariants.narrow}
							showProgress={action.action.ready_to_execute && action.action.dependent_surveys.every(survey => survey.submitted)}
						/>
					</div>
				))}
			</Card>
		);
	} else {
		return null;
	}
};

export const NextActionsCard = withErrorBoundary(_NextActionsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in NextActionsCard: ', error);
	},
});
