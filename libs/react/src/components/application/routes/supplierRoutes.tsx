import { Route } from "react-router-dom";
import { CreateSupplierPage, SupplierDetail, SuppliersPage } from "@coldpbc/components";
import { useFlags} from 'launchdarkly-react-client-sdk'

export const SupplierRoutes = () => {
  const ldFlags = useFlags();

  return (
    <>
      <Route path={'/suppliers'} element={<SuppliersPage />} />
      <Route path={'/suppliers/new'} element={<CreateSupplierPage />} />
      {ldFlags.supplierDetailPageCold1195 && <Route path={'/suppliers/:id'} element={<SupplierDetail />} />}
    </>
  );
};
