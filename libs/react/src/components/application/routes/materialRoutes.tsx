import { Navigate, Route } from 'react-router-dom';
import {CreateMaterialPage, DEFAULT_PAGE, MaterialsPage} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const MaterialRoutes = () => {
  const ldFlags = useFlags();

  return (
    <Route path={'/materials'}>
      <Route index element={ldFlags.showMaterialsPageCold912 ? <MaterialsPage /> : <Navigate to={DEFAULT_PAGE} replace={true} />} />
      <Route path={'new'} element={ldFlags.showCreateMaterialPageCold1015 ? <CreateMaterialPage /> : <Navigate to={DEFAULT_PAGE} replace={true} />} />
    </Route>
  );
};
