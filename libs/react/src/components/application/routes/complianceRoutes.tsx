import { Route } from 'react-router-dom';
import { ComplianceManager } from '@coldpbc/components';

export const ComplianceRoutes = () => {
  return <Route path={'/compliance/:name'} element={<ComplianceManager />} />;
};
