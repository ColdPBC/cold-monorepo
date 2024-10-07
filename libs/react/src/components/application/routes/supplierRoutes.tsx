import {useFlags} from "launchdarkly-react-client-sdk";
import {Navigate, Route} from "react-router-dom";
import {CreateSupplierPage, SuppliersPage} from "@coldpbc/components";

export const SupplierRoutes = () => {
  const ldFlags = useFlags();

  return (
		<>
			{ldFlags.showSuppliersPageCold890 && <Route path={'/suppliers'} element={<SuppliersPage />} />}
      <Route path={'/suppliers/new'} element={<CreateSupplierPage />} />
		</>
	);

}
