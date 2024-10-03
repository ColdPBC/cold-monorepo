import { Navigate, Route } from 'react-router-dom';
import {CreateMaterialPage, MaterialDetail, MaterialsPage} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const MaterialRoutes = () => {
  const ldFlags = useFlags();

  return (
    <Route path={'/materials'}>
      <Route index element={ldFlags.showMaterialsPageCold912 ? <MaterialsPage /> : <Navigate to={'/compliance'} replace={true} />} />
      <Route path={'new'} element={ldFlags.showCreateMaterialPageCold1015 ? <CreateMaterialPage /> : <Navigate to={'/compliance'} replace={true} />} />
    </Route>
  );
};
