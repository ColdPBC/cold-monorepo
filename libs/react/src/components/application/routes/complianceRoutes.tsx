import { Route } from 'react-router-dom';
import { CompliancePage } from '@coldpbc/components';

export const ComplianceRoutes = () => {
  return (
    <Route path={'/compliance'}>
      <Route index element={<CompliancePage />} />
    </Route>
  );
};
