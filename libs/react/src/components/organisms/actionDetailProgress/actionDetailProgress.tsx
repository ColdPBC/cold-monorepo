import React from 'react';
import { ActionPayload, Assignee } from '@coldpbc/interfaces';
import { ActionDetailCardVariants } from '@coldpbc/enums';
import { ActionDetailCard } from '../../molecules/actionDetailCard/actionDetailCard';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

export type ActionDetailProgressProps = {
	actionPayload: ActionPayload;
	setActionPayload: (actionPayload: ActionPayload) => void;
};
const _ActionDetailProgress = ({ actionPayload, setActionPayload }: ActionDetailProgressProps) => {
	return <ActionDetailCard actionPayload={actionPayload} setActionPayLoad={setActionPayload} variant={ActionDetailCardVariants.ActionDetailProgress} />;
};

export const ActionDetailProgress = withErrorBoundary(_ActionDetailProgress, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ActionDetailProgress: ', error);
	},
});
