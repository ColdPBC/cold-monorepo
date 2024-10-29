import { Route } from 'react-router-dom';
import {CreateMaterialPage, MaterialsPage} from '@coldpbc/components';

export const MaterialRoutes = () => (
  <>
    <Route path={'/materials'} element={<MaterialsPage /> } />
    <Route path={'/materials/new'} element={<CreateMaterialPage />} />
  </>
);
