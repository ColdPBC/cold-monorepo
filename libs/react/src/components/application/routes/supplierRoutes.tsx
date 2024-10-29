import {Route} from "react-router-dom";
import {CreateSupplierPage, SuppliersPage} from "@coldpbc/components";

export const SupplierRoutes = () => (
  <>
    <Route path={'/suppliers'} element={<SuppliersPage />} />
    <Route path={'/suppliers/new'} element={<CreateSupplierPage />} />
  </>
);
