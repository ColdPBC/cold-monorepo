import { Route } from 'react-router-dom';
import { ComplianceOverview } from '@coldpbc/components';
import { ComplianceDetail } from '../../pages/complianceDetail/complianceDetail';

export const ComplianceRoutes = () => {
  return (
    <Route path={'/compliance'}>
      <Route index element={<ComplianceOverview />} />
      <Route path={':name'} element={<ComplianceDetail />} />
    </Route>
  );
};
