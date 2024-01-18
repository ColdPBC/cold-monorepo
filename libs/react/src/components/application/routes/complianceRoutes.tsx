import { Route } from 'react-router-dom';
import { SubcategoryActionsList } from '../../pages/subcategoryActionsList';
import { ActionsOverview } from '../../pages/actionsOverview/actionsOverview';
import { Compliance } from '@coldpbc/components';
import { ComplianceDetail } from '../../pages/complianceDetail/complianceDetail';

export const ComplianceRoutes = () => {
  // get the /actions and /actions/:name routes

  return (
    <Route path={'/compliance'}>
      <Route index element={<Compliance />} />
      <Route path={':name'} element={<ComplianceDetail />} />
    </Route>
  );
};
