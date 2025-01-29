import { useFlags } from 'launchdarkly-react-client-sdk';
import { Route } from 'react-router-dom';
import { ComplianceQuestionnaire } from '@coldpbc/components';

export const QuestionnaireRoutes = () => {
  return (
    <Route path={'/assessment'}>
      <Route path={':complianceName'} element={<ComplianceQuestionnaire />} />
    </Route>
  );
};
