import { useFlags } from 'launchdarkly-react-client-sdk';
import { Route } from 'react-router-dom';
import { CreateSupplierPage, SuppliersPage } from '@coldpbc/components';

export const SupplierRoutes = () => {
	const ldFlags = useFlags();

	return (
		<>
			{ldFlags.showSuppliersPageCold890 && <Route path={'/suppliers'} element={<SuppliersPage />} />}
			{ldFlags.showCreateSupplierPageCold1014 && <Route path={'/suppliers/new'} element={<CreateSupplierPage />} />}
		</>
	);
};
