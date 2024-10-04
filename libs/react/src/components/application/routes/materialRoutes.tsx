import { Navigate, Route } from 'react-router-dom';
import {CreateMaterialPage, MaterialsPage} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const MaterialRoutes = (defaultPage: string) => {
  const ldFlags = useFlags();

  return (
    <Route path={'/materials'}>
      <Route index element={ldFlags.showMaterialsPageCold912 ? <MaterialsPage /> : <Navigate to={defaultPage} replace={true} />} />
      <Route path={'new'} element={ldFlags.showCreateMaterialPageCold1015 ? <CreateMaterialPage /> : <Navigate to={defaultPage} replace={true} />} />
    </Route>
  );
};
