import React from 'react';
import { ErrorFallback, MainContent, TeamMemberSettings, UserSettings } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { useFlags } from 'launchdarkly-react-client-sdk';

const _UserSettingsPage = () => {
	const ldFlags = useFlags();
	return <MainContent title="Account">{ldFlags.showTeamMemberTable && <TeamMemberSettings />}</MainContent>;
};

export const UserSettingsPage = withErrorBoundary(_UserSettingsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
