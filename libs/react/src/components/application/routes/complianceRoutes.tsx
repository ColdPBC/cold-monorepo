import { Route } from 'react-router-dom';
import { ComplianceManager, CompliancePage } from '@coldpbc/components';

export const ComplianceRoutes = () => {

  return (
    <Route path={'/assessments'}>
      <Route index element={<CompliancePage />} />
      <Route path={':name'} element={<ComplianceManager />} />
    </Route>
  );
};
