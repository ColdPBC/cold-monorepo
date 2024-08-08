import { Navigate, Route } from 'react-router-dom';
import { MaterialsPage } from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const MaterialRoutes = () => {
  const ldFlags = useFlags();

  if (ldFlags.showMaterialsPageCold912) {
    return (
      <Route path={'/materials'}>
        <Route index element={<MaterialsPage />} />
      </Route>
    );
  } else {
    return null;
  }
};
