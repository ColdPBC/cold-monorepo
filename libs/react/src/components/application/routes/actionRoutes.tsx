import { Route } from 'react-router-dom';
import { SubcategoryActionsList } from '../../pages/subcategoryActionsList/subcategoryActionsList';

export const ActionRoutes = () => {
  // get the /actions and /actions/:name routes

  return (
    <Route path={'/actions'}>
      <Route index element={<div className={'text-tc-primary'}>Actions</div>} />
      <Route path={':name'} element={<SubcategoryActionsList />} />
    </Route>
  );
};
