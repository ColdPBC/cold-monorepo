import React from 'react';
import { ErrorFallback, MainContent, TeamMemberSettings, UserSettings } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';

const _AccountSettingsPage = () => {
	return (
		<MainContent title="Users">
			<UserSettings />
		</MainContent>
	);
};

export const AccountSettingsPage = withErrorBoundary(_AccountSettingsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
