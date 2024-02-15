import { Route } from 'react-router-dom';
import { CompliancePage, ComplianceDetail } from '@coldpbc/components';

export const ComplianceRoutes = () => {
  return (
    <Route path={'/compliance'}>
      <Route index element={<CompliancePage />} />
      <Route path={':name'} element={<ComplianceDetail />} />
    </Route>
  );
};
