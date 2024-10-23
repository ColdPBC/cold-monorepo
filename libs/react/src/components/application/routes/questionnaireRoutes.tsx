import { useFlags } from 'launchdarkly-react-client-sdk';
import { Route } from 'react-router-dom';
import { ComplianceQuestionnaire } from '@coldpbc/components';

export const QuestionnaireRoutes = () => {
	const ldFlags = useFlags();

	if (ldFlags.showNewComplianceManagerCold711) {
		return (
			<Route path={'/questionnaire'}>
				<Route path={':complianceName'} element={<ComplianceQuestionnaire />} />
			</Route>
		);
	} else {
		return null;
	}
};
