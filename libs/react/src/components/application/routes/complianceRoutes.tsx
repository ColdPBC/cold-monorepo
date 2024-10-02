import { Route } from 'react-router-dom';
import { ComplianceManager, CompliancePage } from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const ComplianceRoutes = () => {
  const ldFlags = useFlags();

  return (
    <Route path={'/questionnaires'}>
      <Route index element={<CompliancePage />} />
      {ldFlags.showNewComplianceManagerCold711 && <Route path={':name'} element={<ComplianceManager />} />}
    </Route>
  );
};
