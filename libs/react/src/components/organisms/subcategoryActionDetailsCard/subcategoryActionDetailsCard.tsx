import React, { useEffect } from 'react';
import { Action, ActionPayload } from '@coldpbc/interfaces';
import { ActionDetailCard, ActionItem, Card, Spinner } from '@coldpbc/components';
import { ActionDetailCardVariants, ActionItemVariants } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { mutate } from 'swr';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useAuth0Wrapper } from '@coldpbc/hooks';

export type SubcategoryActionDetailsCardProps = {
	actionPayload: ActionPayload;
};

const _SubcategoryActionDetailsCard = ({ actionPayload }: SubcategoryActionDetailsCardProps) => {
	const areSurveysComplete = (action: Action) => {
		return action.dependent_surveys.every(survey => survey.submitted);
	};

	const { user, getOrgSpecificUrl } = useAuth0Wrapper();

	const updateActionData = async (action: ActionPayload) => {
		await patchAction(action);
	};

	const patchAction = async (action: ActionPayload) => {
		await axiosFetcher([
			getOrgSpecificUrl(`/actions/${action.id}`),
			'PATCH',
			JSON.stringify({
				action: action.action,
			}),
		]);
		await mutate([getOrgSpecificUrl(`/actions`), 'GET']);
	};

	return (
		<Card glow className={'text-tc-primary gap-[8px] p-[16px] bg-bgc-elevated w-[668px]'}>
			<ActionItem
				actionPayload={actionPayload}
				variant={ActionItemVariants.SubcategoryActionDetailsCard}
				showProgress={actionPayload.action.ready_to_execute && areSurveysComplete(actionPayload.action)}
			/>
			<ActionDetailCard
				actionPayload={actionPayload}
				setActionPayLoad={(actionPayload: ActionPayload) => {
					updateActionData(actionPayload);
				}}
				variant={ActionDetailCardVariants.SubcategoryActionDetailsCard}
			/>
		</Card>
	);
};

export const SubcategoryActionDetailsCard = withErrorBoundary(_SubcategoryActionDetailsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SubcategoryActionDetailsCard: ', error);
	},
});
