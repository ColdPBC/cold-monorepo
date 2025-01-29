import { Route } from 'react-router-dom';
import { ComplianceManager, CompliancePage } from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const ComplianceRoutes = () => {
  const ldFlags = useFlags();

  return (
    <Route path={'/assessments'}>
      <Route index element={<CompliancePage />} />
      <Route path={':name'} element={<ComplianceManager />} />
    </Route>
  );
};
