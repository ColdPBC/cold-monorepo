import { MainContent } from '../../organisms/mainContent';
import { UserSettings } from '../../molecules/userSettings';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { TeamMemberSettings } from '../../organisms';

const _Settings = () => {
	const ldFlags = useFlags();

	return (
		<MainContent title="Settings">
			<UserSettings />
			{ldFlags.showTeamMemberTable && <TeamMemberSettings />}
		</MainContent>
	);
};

export const Settings = withErrorBoundary(_Settings, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in Settings: ', error);
	},
});
