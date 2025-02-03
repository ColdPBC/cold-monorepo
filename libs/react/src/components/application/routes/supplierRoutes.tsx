import { Route } from "react-router-dom";
import { CreateSupplierPage, SupplierDetail, SuppliersPage } from "@coldpbc/components";

export const SupplierRoutes = () => {
  return (
    <>
      <Route path={'/suppliers'} element={<SuppliersPage />} />
      <Route path={'/suppliers/new'} element={<CreateSupplierPage />} />
      <Route path={'/suppliers/:id'} element={<SupplierDetail />} />
    </>
  );
};
