import { Navigate, Route } from 'react-router-dom';
import {CreateMaterialPage, MaterialsPage} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const MaterialRoutes = () => {
  const ldFlags = useFlags();

  return (
    <>
      {ldFlags.showMaterialsPageCold912 && <Route path={'/materials'} element={<MaterialsPage /> } />}
      <Route path={'/materials/new'} element={<CreateMaterialPage />} />
    </>
  );
};
