import { Route } from 'react-router-dom';
import { ActionsOverview } from '../../pages';
import { SubcategoryActionsList } from '../../pages/subcategoryActionsList';

export const ActionRoutes = () => {
  // get the /actions and /actions/:name routes

  return (
    <Route path={'/actions'}>
      <Route index element={<div className={'text-tc-primary'}><ActionsOverview /></div>} />
      <Route
        path={':name'}
        element={<SubcategoryActionsList />}
      />
    </Route>
  );
};
